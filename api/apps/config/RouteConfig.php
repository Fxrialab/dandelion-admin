<?php

/**
 * Created by fxrialab team
 * Author: Uchiha
 * Date: 7/30/13 - 10:02 AM
 * Project: UserWired Network - Version: beta
 */
class RouteConfig
{

    //Notice: Put controller contain function is first
    public $default = array(
        'register_POST' => "AdminController",
        'login_POST' => "AdminController",
        'session_GET' => "AdminController",
        'logout_GET' => "AdminController",
        'delete_POST' => "AdminController",
        'checkUser_POST' => "AdminController",
        'checkEmail_POST' => "AdminController",
        'profile_GET' => "AdminController",
        'update_POST' => "AdminController",
        'users_GET' => "UserController",
        'user_GET' => "UserController",
        'status_POST' => "UserController",
        'useractive_GET' => "UserController",
        'admin_POST' => "AdminController",
        'posts_GET' => "PostController",
        'postactive_GET' => "PostController",
        'comments_GET' => "CommentController",
        'forgotPassword_POST' => "AdminController",
        'advancedSearch_POST' => "SearchController",
        'search_POST' => "SearchController",
        'main_GET' => "HomeController",
        'groups_GET' => "GroupController",
        'uploadTheme_GET|POST' => "ThemeController",
        'deleteTheme_GET' => "ThemeController",
        'themes_GET' => "ThemeController",
        'install_GET' => "ThemeController",
        'detailFile_GET' => "HomeController",
        'saveTheme_POST' => "ThemeController",
        'remove_GET' => "ThemeController",
        'buynow_GET' => "ThemeController",
        'plugin_GET' => "PluginController",
        'installPlugin_GET' => "PluginController",
        'detailPlugin_GET' => "PluginController",
        'savePlugin_POST' => "PluginController",
        'removePlugin_GET' => "PluginController",
        'buynowPlugin_GET' => "PluginController",
        'uploadPlugin_GET|POST' => "PluginController",
        'photos_GET' => "PhotoController",
    );

}
