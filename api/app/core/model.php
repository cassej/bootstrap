<?php
namespace core;

abstract class model
{
	/**
	 * @property db $db
	 */

	/**
	 * @property redis $redis
	 */

	public function __get($var)
	{
		switch ($var) {
			case 'db':
				$this->db = db::getInstance();
				return $this->db;
				break;
			case 'redis':
				$this->redis = redis::getInstance();
				return $this->redis;
				break;
		}

	}
}