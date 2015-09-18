<?php
namespace core;

class db extends \mysqli
{
	protected static $instance;
	private function __clone()    {  }
	private function __wakeup()   {  }

	/**
	 * @param string $db
	 *
	 * @return db
	 */

	public static function getInstance($db = 'main')
	{
		if ( !isset(self::$instance[$db]) || is_null(self::$instance[$db]) ) {
			self::$instance[$db] = new self($db);
		}
		return self::$instance[$db];
	}

	private function __construct($db)
	{
		$conf = parse_ini_file(__DIR__.'/../config.ini', true);
		$conf = $conf['db/'.$db];
		parent::__construct($conf['host'], $conf['user'], $conf['password'], $conf['dbname']);
		$this->set_charset('utf8');
	}

	public function insert($table, $data, $duplicate_update = false)
	{
		foreach ($data as $field => $value) {
			$values[] = "`$field` = '".addcslashes($value, "'")."'";
		}

		$sql = "INSERT INTO `$table` SET ".implode(',' ,$values);
		if ($duplicate_update) {
			$sql .= " ON DUPLICATE KEY UPDATE ".implode(',' ,$values);
		}
		$this->query($sql);
		return $this->error?$this->error:$this->insert_id;
	}

	public function multi_insert($table, $data, $duplicate_update = false)
	{
		foreach ($data as $i => $row) {
			foreach ($row as $field => $value) {
				$fields[$field] = "`$field`";
				$values[$i][$field] = "'".addcslashes($value, "'")."'";
			}
			ksort($values[$i]);
			$values[$i] = '('.implode(',', $values[$i]).')';
		}
		ksort($fields);

		if ($duplicate_update) {
			foreach ($fields as $field) {
				$update_fields[$field] = "$field = VALUES($field)";
			}
		}

		$sql = "INSERT INTO `$table`(".implode(', ' ,$fields).") VALUES ".implode(',' ,$values);
		if ($duplicate_update) {
			$sql .= " ON DUPLICATE KEY UPDATE ".implode(',',$update_fields);
		}

		return $this->query($sql)?:$this->error;
	}

	public function replace($table, $data)
	{
		foreach ($data as $field => $value) {
			$values[] = "`$field` = '".addcslashes($value, "'")."'";
		}

		$sql = "REPLACE INTO `$table` SET ".implode(', ' ,$values);
		return $this->query($sql);
	}

	public function update($table, $data, $params)
	{
		if (is_array($data) && !empty($data)) {
			foreach ($data as $field => $value) {
				$values[] = "`$field` = '".addcslashes($value, "'")."'";
			}

			foreach ($params as $field => $value) {
				$where[] = "`$field` = '".addcslashes($value, "'")."'";
			}

			$sql = 'UPDATE `'.$table.'` SET '.implode(', ' ,$values).' WHERE '.implode(' AND ', $where);
			return $this->query($sql);
		} else {
			return false;
		}
	}

	public function delete($table, $params)
	{
		foreach ($params as $field => $value) {
			if (is_array($value)) {
				foreach ($value as &$val) {
					if ((int)$val != $val) {
						$val = '"'.addcslashes($val, '"').'"';
					}
				}
				$value = implode(',', $value);
				$where[] = "`$field` IN (".$value.")";
			} else {
				$where[] = "`$field` = '".addcslashes($value, "'")."'";
			}
		}

		$sql = 'DELETE FROM `'.$table.'` WHERE '.implode(' AND ', $where);
		return $this->query($sql)->affected_rows;
	}

	public function getFiltered($table, $params = array(), $order = array(), $limit = array())
	{
		if (!empty($params)) {
			foreach ($params as $field => $value) {
				if (!is_array($value)) {
					if (stripos($value, 'SELECT') === false) {
						$where[] = "`$field` = '".addcslashes($value, "'")."'";
					} elseif (strlen($value) == 0) {
						$where[] = "`$field` NOT NULL";
					} else {
						$where[] = "`$field` IN (".$value.")";
					}
				} else {
					foreach ($value as &$item) {
						$item = addcslashes($item, "'");
					}

					$where[] = "`$field` IN ('".implode("','", $value)."')";
				}
			}
		}
		$sql = 'SELECT SQL_CALC_FOUND_ROWS * FROM `'.$table.'` '.(isset($where)?'WHERE '.implode(' AND ', $where):'');
		if (!empty($order)) {
			foreach ($order as $field => $value) {
				$orders[] = $field.' '.$value;
			}
			$sql .= ' ORDER BY '.implode(',',$orders);
		}

		if (!empty($limit)) {
			$sql .= ' LIMIT '.implode(',', $limit);
		}

		return $this->query($sql)->fetch_all(MYSQL_ASSOC);
	}

	public function getRowByKeys($table, $params)
	{
		foreach ($params as $field => $value) {
			$where[] = "`$field` = '".addcslashes($value, "'")."'";
		}
		$sql = 'SELECT * FROM `'.$table.'` WHERE '.implode(' AND ', $where);
		return $this->query($sql)->fetch_assoc();
	}

	public function getFoundRows()
	{
		return $this->query('SELECT FOUND_ROWS()')->fetch_assoc()['FOUND_ROWS()'];
	}

	public function query($sql)
	{
		$res = parent::query($sql);
		if ($this->error) {
			throw new Exception("$this->error\n");
		}
		return $res;
	}
}