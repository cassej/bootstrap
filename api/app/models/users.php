<?php
namespace models;
use core\model;

class users extends model
{
	public function login($login, $password)
	{
		$user = $this->db->getRowByKeys(
			'users',
			array(
				'login' => $login,
				'password' => md5($password)
			)
		);

		if ($user) {
			$token = md5(implode($user).time());
			$this->redis->hSet('authorized', $token, $user['id']);

			$user['token'] = $token;

			$this->redis->hSet('users', $user['id'], json_encode($user));

			return $user;
		}

		return false;
	}

	public function getByToken($token)
	{
		return $this->redis->hGet('authorized', $token);
	}

	public function getProfile($id)
	{
		$user = json_decode($this->redis->hGet('users', $id), 1);

		if (!$user) {
			$user = $this->db->getRowByKeys(
				'users',
				array(
					'id' => $id
				)
			);
		}

		return $user;
	}

	public function updateProfile($id, $data)
	{
		$this->db->update('users', $data, array('id' => $id));
		$this->redis->hSet(
			'users',
			$id,
			json_encode(
				$user = $this->db->getRowByKeys(
					'users',
					array(
						'id' => $id
					)
				)
			)
		);
	}
}