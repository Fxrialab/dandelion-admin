<?php

/**
 * Created by fxrialab team
 * Author: Uchiha
 * Date: 7/31/13 - 2:18 PM
 * Project: UserWired Network - Version: beta
 */
class PluginController extends AppController
{

    public function uploadPlugin()
    {
        $upload = new UploadPlugin();
    }

    public function installPlugin()
    {
        $model = $this->facade->findByPk('plugin', $_GET['id']);
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
        $update = $this->facade->updateByAttributes('plugin', $array, array('@rid' => '#' . $model->recordID));
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

    public function detailPlugin()
    {
        if ($_GET['token'] == $this->f3->get('SESSION.token'))
        {
            $model = $this->facade->findByPk('plugin', $_GET['id']);
            $arr = array(
                'id' => $model->recordID,
                'name' => $model->data->name,
                'file' => $model->data->file_name,
                'size' => $model->data->size,
                'description' => $model->data->description,
                'published' => date('Y/m/d', $model->data->published)
            );
            echo json_encode($arr);
        }
    }

    public function plugin()
    {
        $obj = new ObjectHandler();
        $model = $this->facade->findAll('plugin', $obj);
        $arr = array();
        if (!empty($model))
        {
            foreach ($model as $key => $value)
            {
                if ($value->data->status == 0)
                    $status = "Install";
                else
                    $status = "Active";
//                list($name, $ext) = explode(".", $value->data->file);
                $arr[] = array(
                    'recordID' => $value->recordID,
                    'id' => str_replace(':', '_', $value->recordID),
                    'name' => $value->data->name,
                    'file' => $value->data->file_name,
                    'size' => $value->data->size,
                    'userID' => '',
                    'status' => $status,
                    'published' => date('Y/m/d', $value->data->published)
                );
            }
        }
        echo json_encode($arr);
    }

    public function removePlugin()
    {
        if ($_GET['token'] == $this->f3->get('SESSION.token'))
        {
            $model = $this->facade->deleteByPk('plugin', $_GET['id']);
            echo json_encode(array('success' => $model, 'id' => str_replace(':', '_', $_GET['id'])));
        }
    }

    public function buynowPlugin()
    {
        if ($_GET['token'] == $this->f3->get('SESSION.token'))
        {
            $model = $this->facade->findByPk('plugin', $_GET['id']);
            $dir = DOCUMENT_ROOT . 'files/';
            $download = DOCUMENT_ROOT . 'downloads/';
            mkdir($download . $this->f3->get('SESSION.token'));
            copy($dir . $model->data->file_name, $download . $this->f3->get('SESSION.token') . '/' . $model->data->file_name);
        }
    }

}