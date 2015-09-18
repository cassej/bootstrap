<?php
namespace controllers;
use models\users as UsersModel;

class users extends authorized
{
	public function profile()
	{
		$users = new UsersModel();
		$user = $users->getProfile(isset($this->request->id)?$this->request->id:$this->user);
		if (!$user) {
			return array("error" => "Такого пользователя не существует");
		}
		return $user;
	}
}