<?php

class AdminController extends AppController
{

    protected $helpers = array("Encryption", "Validate", "Email", "String", "Time");

    public function __construct()
    {
        parent::__construct();
    }

    public static function token()
    {
//Under the string $Caracteres you write all the characters you want to be used to randomly generate the code. 
        $Caracteres = '0123456789';
        $QuantidadeCaracteres = strlen($Caracteres);
        $QuantidadeCaracteres--;

        $token = NULL;
        for ($x = 1; $x <= 20; $x++)
        {
            $Posicao = rand(0, $QuantidadeCaracteres);
            $token .= substr($Caracteres, $Posicao, 1);
        }

        return $token;
    }

    public function register()
    {
        if ($this->f3->get('SESSION.token') != $_GET['token'])
        {
            $data = json_decode(file_get_contents("php://input"));
            $array = array(
                'username' => $data->data->username,
                'password' => $this->EncryptionHelper->HashPassword($data->data->password),
                'email' => $data->data->email,
                'fullName' => $data->data->name,
                'phone' => $data->data->phone,
                'address' => $data->data->address,
                'status' => 0,
                'role' => 'admin',
                'published' => time(),
            );
            $admin = $this->facade->save('admin', $array);
            if (!empty($admin))
            {
                $model = $this->facade->findByPk('admin', $admin);
                echo json_encode(array(
                    'id' => $model->recordID,
                    'status' => 'success'
                ));
            }
        }
    }

    public function admin()
    {
        if ($this->f3->get('SESSION.token') == $_GET['token'])
        {
            $obj = new ObjectHandler();
            $model = $this->facade->findAll('admin', $obj);
            $arr = array();
            if (!empty($model))
            {
                foreach ($model as $key => $value)
                {
                    $arr[] = array(
                        'recordID' => $value->recordID,
                        'id' => str_replace(':', '_', $value->recordID),
                        'username' => $value->data->username,
                        'email' => $value->data->email,
                        'name' => $value->data->fullName,
                        'status' => $value->data->status == '1' ? "Confirmed" : "Pending",
                        'role' => $value->data->role,
                        'phone' => $value->data->phone,
                        'address' => $value->data->address,
                        'published' => date('Y/m/d', $value->data->published)
                    );
                }
            }
        }

        echo json_encode($arr);
    }

    public function session()
    {
        echo json_encode(array(
            'userID' => $this->f3->get('SESSION.userID'),
            'fullName' => $this->f3->get('SESSION.fullName'),
            'email' => $this->f3->get('SESSION.email'),
            'username' => $this->f3->get('SESSION.username'),
            'token' => $this->f3->get('SESSION.token'),
            'role' => $this->f3->get('SESSION.role')
        ));
    }

    public function login()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data))
        {
            $username = $data->data->username;
            $password = $data->data->password;
            $admin = $this->facade->findByAttributes('admin', array('username' => $username, 'status' => 1));
            if (!empty($admin))
            {
                if ($this->EncryptionHelper->CheckPassword($password, $admin->data->password))
                {
                    $this->f3->set('SESSION.userID', $admin->recordID);
                    $this->f3->set('SESSION.username', $admin->data->username);
                    $this->f3->set('SESSION.email', $admin->data->email);
                    $this->f3->set('SESSION.role', $admin->data->role);
                    $this->f3->set('SESSION.fullName', $admin->data->fullName);
                    $this->f3->set('SESSION.token', $this->token());
                    echo json_encode(array(
                        'userID' => $admin->recordID,
                        'fullName' => $admin->data->fullName,
                        'email' => $admin->data->email,
                        'username' => $admin->data->username,
                        'token' => $this->f3->get('SESSION.token'),
                        'status' => 'success'
                    ));
                }
                else
                {
                    echo json_encode(array('error' => 'errorPassword'));
                }
            }
            else
            {
                echo json_encode(array('error' => 'errorUsername'));
            }
        }
    }

    public function logout()
    {
        $this->f3->clear("SESSION");
    }

    public function update()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data))
        {
            if (!empty($data->comfirmPassword))
            {
                if ($this->EncryptionHelper->CheckPassword($data->comfirmPassword, $model->data->password))
                {

                    $array = array(
                        'username' => $data->username,
                        'password' => $this->EncryptionHelper->HashPassword($data->newPassword),
                        'email' => $data->email,
                        'firstName' => $data->firstName,
                        'lastName' => $data->lastName,
                        'fullName' => $data->firstName . ' ' . $data->lastName
                    );
                }
                else
                {
                    echo json_encode(array('success' => 'Error password or comfirm password'));
                }
            }
            else
            {
                $array = array(
                    'username' => $data->username,
                    'email' => $data->email,
                    'firstName' => $data->firstName,
                    'lastName' => $data->lastName,
                    'fullName' => $data->firstName . ' ' . $data->lastName
                );
            }
        }
        $admin = $this->facade->updateByAttributes('admin', $array, array('@rid' => '#' . $this->f3->get('SESSION.userID')));
        if (!empty($admin))
        {
            echo json_encode(array('success' => 'You have changed successfully'));
        }
    }

    public function forgotPassword()
    {
        $data = json_decode(file_get_contents("php://input"));
        if ($data->email)
        {
            $isUsedEmail = $this->facade->findByAttributes('admin', array('email' => $data->email));
            if ($isUsedEmail)
            {
                $password = $this->StringHelper->generateRandomString(5);
                echo json_encode(array('msg' => 'New password has been created successfully'));
            }
            else
            {
                echo json_encode(array('msg' => 'This email does not exist in system'));
            }
        }
    }

    public function delete()
    {
        $delete = $this->facade->deleteByPk('admin', $_GET['id']);
        if (!empty($delete))
            echo '1';
    }

    public function checkUser()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->username))
        {
            $username = $this->facade->findByAttributes('admin', array('username' => $data->username));
            if (!empty($username))
                echo 'Username already exists.';
            else
                echo 'Username is not exist';
        }
        else
        {
            echo '';
        }
    }

    public function checkEmail()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->email))
        {
            $email = $this->facade->findByAttributes('admin', array('email' => $data->email));
            if (!empty($email))
                echo 'Email already exists.';
            else
                echo 'Email is not exist';
        }
        else
        {
            echo '';
        }
    }

    public function profile()
    {
        if ($this->f3->get('SESSION.token') == $_GET['token'])
        {
            if (!empty($_GET['id']))
                $userID = $_GET['id'];
            else
                $userID = $this->f3->get('SESSION.userID');
            $profile = $this->facade->findByPk('admin', $userID);
            if (!empty($profile))
                echo json_encode(array(
                    'id' => $profile->recordID,
                    'username' => $profile->data->username,
                    'name' => $profile->data->fullName,
                    'username' => $profile->data->username,
                    'email' => $profile->data->email,
                    'published' => $profile->data->published,
                    'role' => $profile->data->role,
                ));
        }
    }
    
     public function adminactive()
    {
        if ($_GET['token'] == $this->f3->get('SESSION.token'))
        {
            $model = $this->facade->findByPk('admin', $_GET['id']);
            if (!empty($model))
            {
                if ($model->data->status == 1)
                    $active = 0;
                else
                    $active = 1;
                $update = $this->facade->updateByAttributes('admin', array('status' => $active), array('@rid' => '#' . $model->recordID));
                if (!empty($update))
                    echo json_encode(array(
                        'recordID' => $model->recordID,
                        'id' => str_replace(':', '_', $model->recordID),
                        'status' => $active == 1 ? "Confirmed" : "Pending"
                    ));
            }
        }
    }

}