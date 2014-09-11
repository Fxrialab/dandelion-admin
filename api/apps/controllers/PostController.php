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
                if ($value->data->active != 1)
                    $active = 'Disable';
                else
                    $active = 'Enable';
                $owner = $this->facade->findByPk('user', $value->data->owner);
                $actor = $this->facade->findByPk('user', $value->data->actor);
                $arr[] = array(
                    'recordID' => $value->recordID,
                    'id' => str_replace(':', '_', $value->recordID),
                    'content' => $value->data->content,
                    'owner' => $value->data->owner,
                    'nLike' => $value->data->numberLike,
                    'nComment' => $value->data->numberComment,
                    'nShared' => $value->data->numberShared,
                    'ownerID' => $owner->recordID,
                    'owner' => $owner->data->fullName,
                    'actorID' => $owner->recordID,
                    'actor' => $owner->data->fullName,
                    'active' => $active
                );
            }
        }

        echo json_encode($arr);
    }

    public function postactive()
    {
        if ($_GET['token'] == $this->f3->get('SESSION.token'))
        {
            $model = $this->facade->findByPk('status', $_GET['id']);
            if (!empty($model))
            {
                if ($model->data->active == 1)
                    $active = 0;
                else
                    $active = 1;
                $update = $this->facade->updateByAttributes('status', array('active' => $active), array('@rid' => '#' . $model->recordID));
                if (!empty($update))
                    echo json_encode(array(
                        'recordID' => $model->recordID,
                        'id' => str_replace(':', '_', $model->recordID),
                        'active' => $active == 1 ? "Enable" : "Disable"
                    ));
            }
        }
    }

}