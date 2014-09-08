<?php

class PostController extends AppController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function posts()
    {
//        $data = json_decode(file_get_contents("php://input"));
        $obj = new ObjectHandler();
        $model = $this->facade->findAll('status', $obj);
        $arr = array();
        if (!empty($model))
        {
            foreach ($model as $key => $value)
            {
                $user = $this->facade->findByPk('user', $value->data->owner);
                $arr[] = array(
                    'id' => $value->recordID,
                    'content' => $value->data->content,
                    'nLike' => $value->data->numberLike,
                    'nComment' => $value->data->numberComment,
                    'nShared' => $value->data->numberShared,
                    'userID' => $user->recordID,
                    'fullName' => $user->data->fullName
                );
            }
        }

        echo json_encode($arr);
    }

}