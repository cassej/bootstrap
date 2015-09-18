<?php
namespace controllers;
use entities\worker;
use models\users;

abstract class authorized
{
	public function __construct()
	{
		$token = $_SERVER['Token'];
		$signature = $_SERVER['Signature'];
		$client = $_SERVER['Client'];

		$data = $_REQUEST;


		$users = new users();

		if ($token) {
			$this->user = $users->getByToken($token);
			if (!$this->user) {
				exit(json_encode(array("error" => "auth")));
			}
		} elseif ($signature && $client) {
			$user = $users->getById($client);
			ksort($data);

			if (md5(implode($data).$user['private_key']) != $signature) {
				exit(json_encode(array("error" => "auth")));
			}

			$this->user = $client;
		} else {
			exit(json_encode(array("error" => "auth")));
		}
	}
}