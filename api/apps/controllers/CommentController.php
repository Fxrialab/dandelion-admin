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
                if ($_GET['sort'] == 'today' && date('Y/m/d', $value->data->published) == date('Y/m/d', time()))
                {
                    $arr[0] = array(
                        'id' => 123,
                        'content' => 'sddddddd',
                        'like' => 0,
                        'published' => 'sd',
                        'userID' => '',
                        'fullName' => ''
                    );
                }
                else if ($_GET['sort'] == 'week' && date('Y/m/d', $value->data->published) == date('Y/m/d', time()))
                {
                    $arr[0] = array(
                        'id' => 123,
                        'content' => 'sddddddd',
                        'like' => 0,
                        'published' => 'sd',
                        'userID' => '',
                        'fullName' => ''
                    );
                }
                else if ($_GET['sort'] == 'all')
                {
                    $arr[] = array(
                        'id' => $value->recordID,
                        'content' => $value->data->content,
                        'like' => $value->data->numberLike,
                        'published' => date('Y-m-d', $value->data->published - (7 * 86400)),
                        'userID' => $user->recordID,
                        'fullName' => $user->data->fullName
                    );
                }
            }
        }

        echo json_encode($arr);
    }

}