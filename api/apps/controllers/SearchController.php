<?php

class SearchController extends AppController
{

    protected $helpers = array("Encryption", "Validate", "Email", "String", "Time");

    public function __construct()
    {
        parent::__construct();
    }

    public function advancedSearch()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->keyword))
        {
            $keyword = $data->keyword;
            $arr = array();
            $command = $this->getSearchCommand(array('text'), $keyword);
            if (!empty($data->comment))
                $result = Model::get('search')->callGremlin($command, array('table' => 'comment'));
            else if (!empty($data->post))
                $result = Model::get('search')->callGremlin($command, array('table' => 'status'));
            else
                $result = Model::get('search')->callGremlin($command);
            if (!empty($result))
            {
                foreach ($result as $value)
                {
                    $rs = Model::get('search')->callGremlin("current.map", array('@rid' => '#' . $value));
                    $published = date('Y-m-d', $rs[0]->published);
                    $user = $this->facade->findByPk('user', $rs[0]->userID);
                    if (!empty($data->from))
                    {
                        if ($data->from == $published)
                            $arr[] = array('content' => $rs[0]->text, 'name' => $user->data->fullName, 'published' => date('Y/m/d', $rs[0]->published));
                    }
                    else if (!empty($data->to))
                    {
                        if ($published <= $data->to)
                            $arr[] = array('content' => $rs[0]->text, 'name' => $user->data->fullName, 'published' => date('Y/m/d', $rs[0]->published));
                    }
                    else if (!empty($data->from) && !empty($data->to))
                    {
                        if ($published >= $data->from && $published <= $data->to)
                            $arr[] = array('content' => $rs[0]->text, 'name' => $user->data->fullName, 'published' => date('Y/m/d', $rs[0]->published));
                    }
                    else
                    {
                        $arr[] = array('content' => $rs[0]->text, 'name' => $user->data->fullName, 'published' => date('Y/m/d', $rs[0]->published));
                    }
                }
            }
            echo json_encode($arr);
        }
    }

}