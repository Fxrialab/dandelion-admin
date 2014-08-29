<?php

/**
 * Created by fxrialab team
 * Author: Uchiha
 * Date: 7/31/13 - 2:18 PM
 * Project: UserWired Network - Version: beta
 */
class ThemeController extends AppController
{

    public function upload()
    {
        $upload = new UploadHandler();
    }

    public function deleteFile()
    {
        $link = BASE_URL . 'files/' . $_GET['file'];
        var_dump($link);
    }

    public function install()
    {
        $data = json_decode(file_get_contents("php://input"));
        $model = $this->facade->findByPk('themes', $data->id);
        $myFile = 'F:\website\dandelion-admin\php\files/' . $model->data->file;
        $myDir = 'F:\website\dandelion-admin\php\files/';
        $destination = $model->data->file;
        $zip = new ZipArchive();
        $x = $zip->open($myFile); // open the zip file to extract
        var_dump($x);
        if ($x === true)
        {
            $zip->extractTo($myDir); // place in the directory with same name
            $zip->close();
            unlink($myFile);
        }

//        $forder = BASE_URL . 'files/';
//        list($name, $ext) = explode(".", $model->data->file);
//        $ext == 'zip' ? true : false;
//        if (!$ext)
//        {
//            $myMsg = "Please upload a valid .zip file.";
//        }
//        $zip = new ZipArchive();
//        $x = $zip->open(BASE_URL . 'files/' . $model->data->file, ZIPARCHIVE::CREATE);
//        if ($x === true)
//        {
//            $a = $zip->extractTo('../files/');
//            var_dump($a);
//            $zip->close();
//        }
//            if (file_exists($source) === true)
//            {
//                $zip = new ZipArchive();
//                if ($zip->open($destination, ZIPARCHIVE::CREATE) === true)
//                {
//                    if (is_dir($source) === true)
//                    {
//                        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);
//                       
//                        foreach ($files as $file)
//                        {
//                            if (is_file($file) === true)
//                            {
//                                $zip->addFromString(basename($file), file_get_contents($file));
//                            }
//                        }
//                    }
//                    else if (is_file($source) === true)
//                    {
//                        $zip->addFromString(basename($source), file_get_contents($source));
//                    }
//                }
//
//                return $zip->close();
//            }
//
//        return false;
    }

    public function detailTheme()
    {
        $data = json_decode(file_get_contents("php://input"));
        $model = $this->facade->findByPk('themes', $data->id);
        list($name, $ext) = explode(".", $model->data->file);
        $arr = array(
            'id' => $model->recordID,
            'name' => $name,
            'file' => $model->data->file,
            'size' => $model->data->size,
            'description' => $model->data->description,
            'numberDown' => $model->data->numberDown,
            'userID' => $model->data->userID,
            'published' => date('Y/m/d', $model->data->published)
        );
        echo json_encode($arr);
    }

    public function theme()
    {
        $obj = new ObjectHandler();
        $model = $this->facade->findAll('themes', $obj);
        $arr = array();
        if (!empty($model))
        {
            foreach ($model as $key => $value)
            {
                list($name, $ext) = explode(".", $value->data->file);
                $arr[] = array(
                    'id' => $value->recordID,
                    'name' => $name,
                    'file' => $value->data->file,
                    'size' => $value->data->size,
                    'numberDown' => $value->data->numberDown,
                    'userID' => '',
                    'published' => date('Y/m/d', $value->data->published)
                );
            }
        }
        echo json_encode($arr);
//        $dir = 'files';
//        if (is_dir($dir))
//        {
//            if ($handle = opendir($dir))
//            {
//                $i = 0;
//                while (($file = readdir($handle)) !== false) {
//                    $i++;
//                    if ($file != "." && $file != "..")
//                    {
//                        list($name, $ext) = explode(".", $file);
//                        $data[] = array('id' => $i, 'name' => $name, 'file' => $file, 'url' => BASE_URL . $dir . '/' . $file, 'size' => '235');
//                    }
//                }
//                echo json_encode($data);
//                closedir($handle);
//            }
//        }
    }

    public function description()
    {
        $data = json_decode(file_get_contents("php://input"));
        $model = $this->facade->findByPk('themes', $data->id);
        if (!empty($model))
        {
            $array = array(
                'description' => $data->description
            );
        }
        $update = $this->facade->updateByAttributes('themes', $array, array('@rid' => '#' . $model->recordID));
    }

}