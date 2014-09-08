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
            $countPhoto = $this->facade->count('photo', array('actor' => $model->recordID));
            $status = $this->facade->findAllAttributes('status', array('owner' => $model->recordID));
            $dataStatus = array();
            if (!empty($status))
            {
                foreach ($status as $value)
                {
                    $dataStatus[] = array('id' => $value->recordID, 'content' => $value->data->content, 'active' => $value->data->active);
                }
            }
            $comment = $this->facade->findAllAttributes('comment', array('owner' => $model->recordID));
            $dataComment = array();
            if (!empty($comment))
            {
                foreach ($comment as $value)
                {
                    $dataComment[] = array('id' => $value->recordID, 'content' => $value->data->content, 'numberLike' => $value->data->numberLike);
                }
            }
            echo json_encode(array(
                'user' => array(
                    'id' => $model->recordID,
                    'username' => $model->data->username,
                    'email' => $model->data->email,
                    'name' => $model->data->fullName,
                    'status' => $model->data->status,
                    'countStatus' => $countStatus,
                    'countComment' => $countComment,
                    'countPhoto' => $countPhoto,
                    'friends' => '1234',
                    'role' => $model->data->role
                ),
                'status' => $dataStatus,
                'comments' => $dataComment
            ));
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
        if (!empty($model))
        {
            foreach ($model as $key => $value)
            {
                $countStatus = $this->facade->count('status', array('owner' => $value->recordID));
                $countComment = $this->facade->count('comment', array('actor' => $value->recordID));
                $countPhoto = $this->facade->count('photo', array('actor' => $value->recordID));
                $arr[] = array(
                    'id' => $value->recordID,
                    'username' => $value->data->username,
                    'email' => $value->data->email,
                    'name' => $value->data->fullName,
                    'status' => $value->data->status,
                    'countStatus' => $countStatus,
                    'countComment' => $countComment,
                    'countPhoto' => $countPhoto,
                    'friends' => '1234',
                    'role' => $value->data->role);
            }
        }

        echo json_encode($arr);
    }

}