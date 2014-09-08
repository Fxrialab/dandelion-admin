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
        $model = $this->facade->findByPk('themes', $_GET['id']);
        if (!empty($model))
        {
            if ($model->data->status == 0)
                $status = 1;
            else
                $status = 0;
            $array = array(
                'status' => $status
            );
        }
        $update = $this->facade->updateByAttributes('themes', $array, array('@rid' => '#' . $model->recordID));
        $file = $model->data->file;
        $zip = new ZipArchive;
        if ($zip->open('files/' . $file) === TRUE)
        {
            //extract contents to /data/ folder
            $zip->extractTo('files/');
            //close the archive
            $zip->close();
            echo 'Archive extracted to data/ folder!';
        }
        else
        {
            echo 'Failed to open the archive!';
        }
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

    public function themes()
    {
        $obj = new ObjectHandler();
        $model = $this->facade->findAll('themes', $obj);
        $arr = array();
        if (!empty($model))
        {
            foreach ($model as $key => $value)
            {
                if ($value->data->status == 0)
                    $status = "Install";
                else
                    $status = "Active";
                list($name, $ext) = explode(".", $value->data->file);
                $arr[] = array(
                    'id' => $value->recordID,
                    'name' => $name,
                    'file' => $value->data->file,
                    'size' => $value->data->size,
                    'numberDown' => $value->data->numberDown,
                    'userID' => '',
                    'status' => $status,
                    'published' => date('Y/m/d', $value->data->published)
                );
            }
        }
        echo json_encode($arr);
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