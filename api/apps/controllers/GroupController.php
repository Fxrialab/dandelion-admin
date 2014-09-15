<?php

class GroupController extends AppController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function groups()
    {
        if ($_GET['token'] == $this->f3->get('SESSION.token'))
        {
            $obj = new ObjectHandler();
            $model = $this->facade->findAll('group', $obj);
            $arr = array();
            if (!empty($model))
            {
                foreach ($model as $key => $value)
                {
          
                    $owner = $this->facade->findByPk('user', $value->data->owner);
                    $arr[] = array(
                        'recordID' => $value->recordID,
                        'id' => str_replace(':', '_', $value->recordID),
                        'name' => $value->data->name,
                        'owner' => $value->data->owner,
                        'numMember' => $value->data->numMember,
                        'privacy' => $value->data->privacy,
                        'description' => '',
                        'ownerID' => $owner->recordID,
                        'ownerName' => $owner->data->fullName,
                        'published' => date('Y/m/d', $value->data->published)
                    );
                }
            }

            echo json_encode($arr);
        }
    }

}