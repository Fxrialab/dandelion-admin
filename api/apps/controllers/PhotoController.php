<?php

class PhotoController extends AppController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function photos()
    {
        $obj = new ObjectHandler();
        $model = $this->facade->findAll('photo', $obj);
        $arr = array();
        if (!empty($model))
        {
            foreach ($model as $key => $value)
            {
                $actor = $this->facade->findByPk('user', $value->data->actor);
                $arr[] = array(
                    'id' => $value->recordID,
                    'fileName' => $value->data->fileName,
                    'description' => $value->data->description,
                    'numberLike' => $value->data->numberLike,
                    'numberComment' => $value->data->numberComment,
                    'actor' => $actor->data->fullName,
                    'actorID' => $actor->recordID
                );
            }
        }

        echo json_encode($arr);
    }

}