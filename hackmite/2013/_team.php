<div class="content">
    <?php

    $soyjavi = array("name"=>"Javi Jimenez", "twitter"=>"soyjavi", "linkedin"=>"soyjavi");
    $igonzalez = array("name"=>"Iñigo González", "twitter"=>"haas85");

    $equipos["Equipo 1 - speakerIn"]            = array(
        array("name"=>"Asier Marqués", "twitter"=>"asiermarques", "linkedin"=>"asier"),
        array("name"=>"Fran Mosteiro", "twitter"=>"fran_mosteiro", "linkedin"=>"franmosteiro"));
    $equipos["Equipo 2 - Fitness Gamification"] = array($soyjavi, $igonzalez);
    $equipos["Equipo 3 - Harold, facturación rápida para autónomos"]               = array(
        array("name"=>"Eneko Palencia", "twitter"=>"enekopalencia", "linkedin"=>"enekopalencia"),
        array("name"=>"Julen Maneros", "twitter"=>"juIen", "linkedin"=> "jmaneros"));
    $equipos["Equipo 4 - Consumo de agua"]    = array(
        array("name"=>"Alex Epelde", "twitter"=>"epelde", "linkedin"=>"alexepelde"),
        array("name"=>"Javier Gómez", "twitter"=>"poselab", "linkedin"=>"poselab"));
    $equipos["Equipo 5 - PlaceColor"]           = array(
        array("name"=>"Naiara Abaroa", "twitter"=>"nabaroa", "linkedin"=>"naiaraabaroa"),
        $soyjavi,
        $igonzalez);
    $equipos["Equipo 6 - Toke!, Servicio de notificaciones Push"]  = array(
        array("name"=>"David Barahona", "twitter"=>"motionthinks"),
        array("name"=>"José María Quevedo", "twitter"=>"motionlabs"));
    $equipos["Equipo 7 - Seguimiento social de Eventos"]              = array(
        array("name"=>"Alfredo Fernández", "twitter"=>"afernandez_l"),
        array("name"=>"Gerard López", "twitter"=>"gerard_lopz"),
        array("name"=>"Juanjo Villar","twitter"=>"jj_villar"),
        array("name"=>"Ion López")
    );





    foreach($equipos as $equipo=>$pollos){ ?>
        <h2 style="clear: both; padding-top:20px; margin-bottom: 6px"><?php echo $equipo ?></h2>
        <?php

        foreach($pollos as $pollo){ ?>

            <div class="member" style="width:290px; margin-bottom: 20px; color:#333; background: #fff; margin-right: 10px; float:left; ">
                <?php if(isset($pollo["twitter"])){ ?>
                <div style="padding: 20px 0px; float:left;;">
                    <img width="42" height="42" src="" class="teammember_avatar" rel-twitter="<?php echo $pollo["twitter"] ?>"/>
                </div>
                <?php } ?>
                <div class="text" style="padding: 20px; float: left; width: 200px ">
                    <h3><?php echo $pollo["name"] ?></h3>
                    <div style="font-weight: normal" class="bio"></div>
                    <h4>
                        <?php if(isset($pollo["twitter"])){ ?>
                        <a target="_blank" style="color:#666" href="http://twitter.com/<?php echo $pollo["twitter"] ?>">twitter</a>&nbsp;&nbsp;
                        <?php } ?>
                        <?php if(isset($pollo["linkedin"])){ ?>
                        <a target="_blank"  style="color:#666"  href="http://linkedin.com/in/<?php echo $pollo["linkedin"] ?>">linkedin</a>
                        <?php } ?>
                    </h4>
                </div>
                <div class="clear"></div>
            </div>

            <?php }
    }
    ?>
    <div class="clear"></div>
</div>

<script type="text/javascript">
    $(document).ready(function(){

         $(".teammember_avatar").each(function(){


             var nickname = $(this).attr("rel-twitter");
             var image = this;
             $.ajax({
                 url: "http://api.twitter.com/1/users/show/"+nickname+".json?cursor=-1&callback=?",
                 cache: false,
                 dataType: "jsonp",
                 success: function(data) {
                     image.src = data.profile_image_url;
                     //$(image).parent().parent().find(".bio").html(data.description);
                 }
             });


         });
    });
</script>
