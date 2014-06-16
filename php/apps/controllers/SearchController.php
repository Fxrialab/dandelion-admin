<?php

class SearchController extends AppController
{

    protected $helpers = array("Encryption", "Validate", "Email", "String", "Time");

    public function __construct()
    {
        parent::__construct();
    }

    public static function findDataComment($command, $data)
    {
        $result = Model::get('comment')->callGremlin($command);
        if (!empty($result))
        {
            foreach ($result as $value)
            {
                $rs = Model::get('comment')->callGremlin("current.map", array('@rid' => '#' . $value));
                $user = Model::get('user')->find($rs[0]->actor);
                if (!empty($data->date))
                {
                    if ($data->from == date('Y-m-d', $rs[0]->published))
                        return array('content' => $rs[0]->content, 'name' => $user->data->fullName, 'published' => date('Y/m/d', $rs[0]->published));
                    else
                        return FALSE;
                }
                else if (!empty($data->from) && (!empty($data->to)))
                {
                    if ($data->from <= date('Y-m-d', $rs[0]->published) and $data->to >= date('Y-m-d', $rs[0]->published))
                        return array('content' => $rs[0]->content, 'name' => $user->data->fullName, 'published' => date('Y/m/d', $rs[0]->published));
                    else
                        return FALSE;
                }
                else
                {
                    return array('content' => $rs[0]->content, 'name' => $user->data->fullName, 'published' => date('Y/m/d', $rs[0]->published));
                }
            }
        }
        else
            return FALSE;
    }

    public static function findDataStatus($command, $data)
    {
        $result = Model::get('status')->callGremlin($command);
        if (!empty($result))
        {
            foreach ($result as $value)
            {
                $rs = Model::get('status')->callGremlin("current.map", array('@rid' => '#' . $value));
                $user = Model::get('user')->find($rs[0]->actor);
                if (!empty($data->date))
                {
                    if ($data->from == date('Y-m-d', $rs[0]->published))
                        return array('content' => $rs[0]->content, 'name' => $user->data->fullName, 'published' => date('Y/m/d', $rs[0]->published));
                    else
                        return FALSE;
                }
                else if (!empty($data->from) && (!empty($data->to)))
                {
                    if ($data->from <= date('Y-m-d', $rs[0]->published) and $data->to >= date('Y-m-d', $rs[0]->published))
                        return array('content' => $rs[0]->content, 'name' => $user->data->fullName, 'published' => date('Y/m/d', $rs[0]->published));
                    else
                        return FALSE;
                }
                else
                {
                    return array('content' => $rs[0]->content, 'name' => $user->data->fullName, 'published' => date('Y/m/d', $rs[0]->published));
                }
            }
        }
        else
            return FALSE;
    }

    public function search()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->keyword))
        {
            $keyword = $data->keyword;
            $arr = array();
            $command = $this->getSearchCommand(array('content'), $keyword);
            if (!empty($data->comment))
            {
                $comment = $this->findDataComment($command, $data);
                if ($comment == FALSE)
                    $arr = '';
                else
                    $arr[] = $comment;
            }
            else if (!empty($data->post))
            {
                $status = $this->findDataStatus($command, $data);
                if ($status == FALSE)
                    $arr = '';
                else
                    $arr[] = $status;
            } else
            {
                $comment = $this->findDataComment($command, $data);
                $status = $this->findDataStatus($command, $data);
                $arr[] = $comment;

                $arr[] = $status;
            }
            echo json_encode($arr);
        }
    }

}