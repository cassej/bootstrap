<?php
namespace controllers;
use models\users;

class main
{
	public function auth()
	{
		if ($this->request->login && $this->request->password) {
			$user = new users();
			return $user->login($this->request->login, $this->request->password)
				?:array('error'=>'Неправильный логин и/или пароль');
		}
		return array('error' => 'Пароль и/или логин не может быть пустым');
	}
}