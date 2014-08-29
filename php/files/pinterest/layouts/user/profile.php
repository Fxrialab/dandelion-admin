<?php
$data = F3::get('data');
$user = F3::get('user');
$type = F3::get('type');
ViewHtml::render('user/infoBar', array('user' => $user, 'countPost' => F3::get('countPost'), 'countLike' => F3::get('countLike')));
?>
<div class="container-fluid">
    <div style="display: none;" id="ajax-loader-masonry" class="ajax-loader"></div>
    <div id="masonry">
        <?php
        if (!empty($data))
        {
            ?>
<!--            <div class="post">
                <a href="javascript:void(0)" class="postModal">
                    <div class="thumb-holder addPost">
                        <h2>Add Post</h2>
                    </div>
                </a>
            </div>-->
            <?php
            foreach ($data as $key => $value)
            {
                ViewHtml::render('post/viewPost', array(
                    'key' => $key,
                    'status' => $value['status'],
                    'image' => $value['image'],
                    'like' => $value['like'],
                    'user' => $value['user'],
                    'comment' => $value['comment']
                ));
            }
        }
        ?>

    </div>
    <div id="navigation">
        <div id="navigation-next"><a href="/user?user=<?php echo $user->data->username ?>&type=<?php echo $type ?>&page=2"></a></div>
    </div>
    <div style="display: none;" id="scrolltotop"><a href="#">Top</a></div>
</div>
