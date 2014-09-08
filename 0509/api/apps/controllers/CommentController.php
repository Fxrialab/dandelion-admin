<?php

class CommentController extends AppController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function comments()
    {
        $data = json_decode(file_get_contents("php://input"));
        $obj = new ObjectHandler();
        $obj->actor = $data->id;
        $model = $this->facade->findAll('comment', $obj);
        $arr = array();
        if (!empty($model))
        {
            foreach ($model as $key => $value)
            {
                $post = $this->facade->findByPk('status', $value->data->post);
                if (!empty($post))
                    $rs = $post->data->content;
                else
                    $rs = 'null';
                $arr[] = array(
                    'id' => $value->recordID,
                    'content' => $value->data->content,
                    'post' => $rs,
                    'published' => date('Y/m/d', $value->data->published),
                );
            }
        }

        echo json_encode($arr);
    }

}