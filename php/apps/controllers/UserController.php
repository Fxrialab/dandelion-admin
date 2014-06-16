<?php

class UserController extends AppController
{

    protected $helpers = array("Encryption", "Validate", "Email", "String", "Time");

    public function __construct()
    {
        parent::__construct();
    }

    public function user()
    {
        $model = $this->facade->findByPk('user', $_GET['id']);
        if (!empty($model))
        {
            $countStatus = $this->facade->count('status', array('owner' => $model->recordID));
            $countComment = $this->facade->count('comment', array('actor' => $model->recordID));
            echo json_encode(array(
                'id' => $model->recordID,
                'username' => $model->data->username,
                'email' => $model->data->email,
                'name' => $model->data->fullName,
                'status' => $model->data->status,
                'countStatus' => $countStatus,
                'countComment' => $countComment,
                'friends' => '1234',
                'role' => $model->data->role));
        }
    }

    public function status()
    {
        $data = json_decode(file_get_contents("php://input"));
        $model = $this->facade->findByPk('user', $data->id);
        if (!empty($model))
        {
            if ($model->data->status == 'confirmed')
                $status = 'pending';
            else
                $status = 'confirmed';
            $update = $this->facade->updateByAttributes('user', array('status' => $status), array('@rid' => '#' . $model->recordID));
            if (!empty($update))
                echo json_encode(array(
                    'id' => $model->recordID,
                    'status' => $status
                ));
        }
    }

    public function users()
    {
        $obj = new ObjectHandler();
        $model = $this->facade->findAll('user', $obj);
        $arr = array();
        foreach ($model as $key => $value)
        {
            $countStatus = $this->facade->count('status', array('owner' => $value->recordID));
            $countComment = $this->facade->count('comment', array('actor' => $value->recordID));
            $arr[] = array(
                'id' => $value->recordID,
                'username' => $value->data->username,
                'email' => $value->data->email,
                'name' => $value->data->fullName,
                'status' => $value->data->status,
                'countStatus' => $countStatus,
                'countComment' => $countComment,
                'friends' => '1234',
                'role' => $value->data->role);
        }

        echo json_encode($arr);
    }

}