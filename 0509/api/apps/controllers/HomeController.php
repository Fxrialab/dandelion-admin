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
        $countManager = $this->facade->countAll('admin');
        $countUser = $this->facade->countAll('user');
        $countPost = $this->facade->countAll('status');
        $countComment = $this->facade->countAll('comment');
        $countPhoto = $this->facade->countAll('photo');
        $countTheme = $this->facade->countAll('themes');
        echo json_encode(array(
            'countManager' => $countManager,
            'countUser' => $countUser,
            'countPost' => $countPost,
            'countComment' => $countComment,
            'countPhoto' => $countPhoto,
            'countTheme' => $countTheme
        ));
    }

}
