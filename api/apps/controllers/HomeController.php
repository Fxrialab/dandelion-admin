<?php

/**
 * Created by fxrialab team
 * Author: Uchiha
 * Date: 7/31/13 - 2:18 PM
 * Project: UserWired Network - Version: beta
 */
class HomeController extends AppController
{

    protected $helpers = array();

    public function __construct()
    {
        parent::__construct();
    }

    public function main()
    {
        if ($_GET['token'] == $this->f3->get('SESSION.token'))
        {
            $countUser = $this->facade->countAll('user');
            $countPost = $this->facade->countAll('status');
            $countComment = $this->facade->countAll('comment');
            $countPhoto = $this->facade->countAll('photo');
            $countTheme = $this->facade->countAll('themes');
            $countGroup = $this->facade->countAll('group');
            echo json_encode(array(
                'countUser' => $countUser,
                'countPost' => $countPost,
                'countComment' => $countComment,
                'countPhoto' => $countPhoto,
                'countTheme' => $countTheme,
                'countGroup' => $countGroup
            ));
        }
    }

    public function deleteTheme()
    {
        if ($_GET['token'] == $this->f3->get('SESSION.token'))
        {
            $link = DOCUMENT_ROOT . 'files/' . $_GET['file'];
            unlink($link);
        }
    }

}
