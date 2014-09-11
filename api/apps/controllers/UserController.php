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
        if ($this->f3->get('SESSION.token') == $_GET['token'])
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
    }

    public function users()
    {
        if ($this->f3->get('SESSION.token') == $_GET['token'])
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
                        'recordID' => $value->recordID,
                        'id' => str_replace(':', '_', $value->recordID),
                        'username' => $value->data->username,
                        'email' => $value->data->email,
                        'name' => $value->data->fullName,
                        'status' => $value->data->status == 'confirmed' ? "Confirmed" : "Pending",
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

    public function useractive()
    {
        if ($_GET['token'] == $this->f3->get('SESSION.token'))
        {
            $model = $this->facade->findByPk('user', $_GET['id']);
            if (!empty($model))
            {
                if ($model->data->status == 'confirmed')
                    $active = 'pending';
                else
                    $active = 'confirmed';
                $update = $this->facade->updateByAttributes('user', array('status' => $active), array('@rid' => '#' . $model->recordID));
                if (!empty($update))
                    echo json_encode(array(
                        'recordID' => $model->recordID,
                        'id' => str_replace(':', '_', $model->recordID),
                        'status' => $active == 'confirmed' ? "Confirmed" : "Pending"
                    ));
            }
        }
    }

}