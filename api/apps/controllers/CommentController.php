<?php

class CommentController extends AppController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function comments()
    {
        $obj = new ObjectHandler();
        $model = $this->facade->findAll('comment', $obj);
        $arr = array();
        if (!empty($model))
        {
            foreach ($model as $key => $value)
            {
                $user = $this->facade->findByPk('user', $value->data->userID);
                $arr[] = array(
                    'id' => $value->recordID,
                    'content' => $value->data->content,
                    'like' => $value->data->numberLike,
                    'published' => date('Y/m/d', $value->data->published),
                    'userID' => $user->recordID,
                    'fullName' => $user->data->fullName
                );
            }
        }

        echo json_encode($arr);
    }

}