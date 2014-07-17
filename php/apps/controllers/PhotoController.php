<?php

class PhotoController extends AppController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function photos()
    {
        $data = json_decode(file_get_contents("php://input"));
        $obj = new ObjectHandler();
        $obj->actor = $data->id;
        $obj->select = 'limit 100';
        $model = $this->facade->findAll('photo', $obj);
        $arr = array();
        if (!empty($model))
        {
            foreach ($model as $key => $value)
            {
                $arr[] = array(
                    'id' => $value->recordID,
                    'fileName' => $value->data->fileName
                );
            }
        }

        echo json_encode($arr);
    }

}