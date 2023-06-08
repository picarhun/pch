<?php 
    
    $active='PCC';
    include("includes/header.php");

?>
  
   <div id="content"><!-- #content Begin -->
       <div class="container"><!-- container Begin -->
           <div class="col-md-12"><!-- col-md-12 Begin -->
               
               <ul class="breadcrumb"><!-- breadcrumb Begin -->
                   <li>
                       <a href="index.php">Home</a>
                   </li>
                   <li>
                       PC Configurator
                   </li>
               </ul><!-- breadcrumb Finish -->
               
           </div><!-- col-md-12 Finish -->
           
           <div class="col-md-12"><!-- col-md-9 Begin -->
               
               <div class="box"><!-- box Begin -->
                   <div class="box-header"><!-- box-header Begin -->
                       
                        <div class="cim"><!-- center Begin -->
                           
                           <h1> Számítógép Konfigurátor </h1>
                           
                           <p class="text-muted"><!-- text-muted Begin -->
                               
                               Ezen az oldalon elkészítheted saját számítógépedet!
                               
                           </p><!-- text-muted Finish -->
                           
                        </div><!-- center Finish -->

                        <div id="config_valaszto">
                        
                            <div class="image-container">
                                <img id="intel-img" src="images/intel-config.png" alt="Intel kép">
                                <img id="amd-img" src="images/amd-config.png" alt="AMD kép">
                            
                            </div>
                            <div class="button-container">
                                <button id="intel-btn" class="btn btn-info" onclick="selectBrand('Intel')">Intel</button>
                                <button id="amd-btn" class="btn btn-danger" onclick="selectBrand('AMD')">AMD</button>
                            </div>
                            <?php
                                $brand = isset($_POST['brand']) ? $_POST['brand'] : ''; //Ha a brand kulcs létezik a $_POST tömbben, akkor a $brand változó értékét beállítják a $_POST['brand'] értékre. Ha a brand kulcs nem létezik a $_POST tömbben, akkor a $brand változó üres string lesz ('').
                                if ($brand === '') {
                                    echo '<p class="cim">Kérem, ha szükséges válasszon termék családot!</p>';
                                } else {
                                    echo '<p class="cim">A kiválasztott termék család: '.'<span class="red">'.$brand.'</span>'.'</p>';
                                }
                            ?>
                            <div class="button-center">
                                <button id="default-btn" class="btn btn-primary" onclick="Configurator()">Tovább a konfigurátorhoz</button>
                            </div>
                        </div> 

                        <?php
                            if($_SERVER['REQUEST_METHOD'] === 'POST'){

                                $selected_termekek = array();
                                if($_POST['gephaz'] != 0){$selected_termekek[] = $_POST['gephaz'];}
                                if($_POST['alaplap'] != 0){$selected_termekek[] = $_POST['alaplap'];}
                                if($_POST['cpu'] != 0){$selected_termekek[] = $_POST['cpu'];}
                                if($_POST['cpu_huto'] != 0){$selected_termekek[] = $_POST['cpu_huto'];}
                                if($_POST['ram'] != 0){$selected_termekek[] = $_POST['ram'];}
                                if($_POST['gpu'] != 0){$selected_termekek[] = $_POST['gpu'];}
                                if($_POST['hdd'] != 0){$selected_termekek[] = $_POST['hdd'];}
                                if($_POST['ssd'] != 0){$selected_termekek[] = $_POST['ssd'];}
                                if($_POST['tap'] != 0){$selected_termekek[] = $_POST['tap'];}

                                include_once("functions/functions.php");
                                pcc_add($selected_termekek);
                            }
                        ?>
                       
                        <form action="" method="POST"  id="alkatresz-form" onchange="return false;"><!-- form Begin -->

                        <input type="hidden" id="brand-input" name="brand" value="">
                           
                           <div class="form-group"><!-- form-group Begin -->
                               
                               <h2 class="cim">Maximális összeg</h2>
                               
                               <input type="number" class="form-control" name="osszeg" id="maxossz">
                               
                           </div><!-- form-group Finish -->
                           <div class="form-group"> <!-- Gépház -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <h2>Gépház</h2>
                                        <select class="form-control" name="gephaz" id="gephaz">
                                        <?php
                                            echo '<option value="0" data-keywords="" data-price="0">Nincs rá szükség</option>';
                                            $db = mysqli_connect("localhost","root","","pch_shop");
                                            $gephazak = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 8");

                                            while($row = mysqli_fetch_assoc($gephazak)){
                                                echo '<option value="' . $row["product_id"] . '" data-keywords="' . $row["product_keywords"]
                                                 . '" data-price="' . $row["product_price"] . '">' . $row["product_title"] . ' - ' . 
                                                 $row["product_price"] . 'Ft </option>';
                                            }
                                        ?>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="gephazkep">
                                            <?php
                                            $db = mysqli_connect("localhost","root","","pch_shop");
                                            $gephazak = mysqli_query($db, "SELECT product_id, product_img1 from products WHERE p_cat_id = 8");

                                            while($row = mysqli_fetch_assoc($gephazak)){
                                                echo '<img alt="'.$row["product_id"].'" src="admin_area/product_images/'.$row["product_img1"]
                                                .'" class="minikep"></img>';
                                            }
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="gephazmini">
                                        <?php
                                            $db = mysqli_connect("localhost","root","","pch_shop");
                                            $gephazak = mysqli_query($db, "SELECT product_id, product_mini from products WHERE p_cat_id = 8");

                                            while($row = mysqli_fetch_assoc($gephazak)){
                                                echo '<p id="'.$row["product_id"].'">'.$row["product_mini"].'</p>';
                                            }
                                            ?>  
                                        </div>
                                    </div>                               
                                </div>
                            </div>

                            <div class="form-group"><!-- Alaplap -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <h2>Alaplap</h2>
                                        <select class="form-control" name="alaplap" id="alaplap">
                                        <?php
                                            echo '<option value="0" data-keywords="" data-price="0">Nincs rá szükség</option>';
                                            $db = mysqli_connect("localhost","root","","pch_shop");

                                            $brand = isset($_POST['brand']) ? $_POST['brand'] : '';

                                            $alaplap = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 1 AND product_keywords LIKE '%$brand%'");

                                            while($row = mysqli_fetch_assoc($alaplap)){
                                                echo '<option value="' . $row["product_id"] . '" data-keywords="' . $row["product_keywords"] . '" data-price="' . $row["product_price"] . '">' . $row["product_title"] . ' - ' . $row["product_price"] . 'Ft </option>';
                                            }
                                        ?>
                                        </select> 
                                    </div>
                                    <div class="col-md-3">
                                        <div id="alaplapkep">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $brand = isset($_POST['brand']) ? $_POST['brand'] : '';

                                                $alaplap = mysqli_query($db, "SELECT product_id, product_img1 from products WHERE p_cat_id = 1 AND product_keywords LIKE '%$brand%'");

                                                while($row = mysqli_fetch_assoc($alaplap)){
                                                    echo '<img alt="'.$row["product_id"].'" src="admin_area/product_images/'.$row["product_img1"].'" class="minikep"></img>';
                                                }
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="alaplapmini">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $brand = isset($_POST['brand']) ? $_POST['brand'] : '';

                                                $alaplap = mysqli_query($db, "SELECT product_id, product_mini from products WHERE p_cat_id = 1 AND product_keywords LIKE '%$brand%'");

                                                while($row = mysqli_fetch_assoc($alaplap)){
                                                    echo '<p id="'.$row["product_id"].'">'.$row["product_mini"].'</p>';
                                                }
                                            ?>
                                        </div>
                                    </div>
                                </div>
                            </div>                    
                           <div class="form-group"> <!-- Processzor -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <h2>Processzor</h2>

                                        <select class="form-control" name="cpu" id="cpu">
                                            <?php
                                                echo '<option value="0" data-keywords="" data-price="0">Nincs rá szükség</option>';
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $brand = isset($_POST['brand']) ? $_POST['brand'] : '';

                                                $proci = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 2
                                                 AND product_keywords LIKE '%$brand%' ");

                                                while($row = mysqli_fetch_assoc($proci)){
                                                    echo '<option value="' . $row["product_id"] . '" data-keywords="' . $row["product_keywords"] 
                                                    . '" data-price="' . $row["product_price"] . '">' . $row["product_title"] . ' - ' 
                                                    . $row["product_price"] . 'Ft </option>';
                                                }
                                            ?>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="cpukep">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $brand = isset($_POST['brand']) ? $_POST['brand'] : '';

                                                $proci = mysqli_query($db, "SELECT product_id,product_img1 from products WHERE p_cat_id = 2  
                                                AND product_keywords LIKE '%$brand%' ");

                                                while($row = mysqli_fetch_assoc($proci)){
                                                    echo '<img alt="'.$row["product_id"].'" src="admin_area/product_images/'
                                                    .$row["product_img1"].'" class="minikep"></img>';
                                                }
                                            ?> 
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="cpumini">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $brand = isset($_POST['brand']) ? $_POST['brand'] : '';

                                                $proci = mysqli_query($db, "SELECT product_id,product_mini from products WHERE p_cat_id = 2  AND product_keywords LIKE '%$brand%' ");

                                                while($row = mysqli_fetch_assoc($proci)){
                                                    echo '<p id="'.$row["product_id"].'">'.$row["product_mini"].'</p>';
                                                }
                                            ?> 
                                        </div>
                                    </div>
                                </div>
                           </div>

                            <div class="form-group"> <!-- Processzor hűtő -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <h2>Processzor Hűtő</h2>

                                        <select class="form-control" name="cpu_huto" id="cpu_huto">
                                        <?php
                                            echo '<option value="0" data-keywords="" data-price="0">Nincs rá szükség</option>';
                                            $db = mysqli_connect("localhost","root","","pch_shop");
                                            $procih = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 7");

                                            while($row = mysqli_fetch_assoc($procih)){
                                                echo '<option value="' . $row["product_id"] . '" data-keywords="' . $row["product_keywords"] . '" data-price="' . $row["product_price"] . '">' . $row["product_title"] . ' - ' . $row["product_price"] . 'Ft </option>';
                                            }
                                        ?>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="cpuhutokep">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");
                                                $procih = mysqli_query($db, "SELECT product_id,product_img1 from products WHERE p_cat_id = 7");

                                                while($row = mysqli_fetch_assoc($procih)){
                                                    echo '<img alt="'.$row["product_id"].'" src="admin_area/product_images/'.$row["product_img1"].'" class="minikep"></img>';
                                                }
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="cpuhmini">
                                        <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");
                                                $procih = mysqli_query($db, "SELECT product_id,product_mini from products WHERE p_cat_id = 7");

                                                while($row = mysqli_fetch_assoc($procih)){
                                                    echo '<p id="'.$row["product_id"].'">'.$row["product_mini"].'</p>';
                                                }
                                            ?>
                                        </div>
                                    </div>
                                </div>
                            </div>

                           <div class="form-group"> <!-- RAM -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <h2>RAM</h2>

                                        <select class="form-control"  name="ram" id="ram">
                                        <?php
                                            echo '<option value="0" data-keywords="" data-price="0">Nincs rá szükség</option>';
                                            $db = mysqli_connect("localhost","root","","pch_shop");
                                            $ram = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 4");

                                            while($row = mysqli_fetch_assoc($ram)){
                                                echo '<option value="' . $row["product_id"] . '" data-keywords="' . $row["product_keywords"] . '" data-price="' . $row["product_price"] . '">' . $row["product_title"] . ' - ' . $row["product_price"] . 'Ft </option>';
                                            }
                                        ?>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="ramkep">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");
                                                $ram = mysqli_query($db, "SELECT product_id,product_img1 from products WHERE p_cat_id = 4");

                                                while($row = mysqli_fetch_assoc($ram)){
                                                    echo '<img alt="'.$row["product_id"].'" src="admin_area/product_images/'.$row["product_img1"].'" class="minikep"></img>';
                                                }
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="rammini">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");
                                                $ram = mysqli_query($db, "SELECT product_id,product_mini from products WHERE p_cat_id = 4");

                                                while($row = mysqli_fetch_assoc($ram)){
                                                    echo '<p id="'.$row["product_id"].'">'.$row["product_mini"].'</p>';
                                                }
                                            ?>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                           
                            <div class="form-group"> <!-- GPU -->
                            <div class="row">
                                <div class="col-md-6">
                                    <h2>Videókártya</h2>

                                    <select class="form-control" name="gpu" id="gpu">
                                    <?php
                                        $db = mysqli_connect("localhost","root","","pch_shop");

                                        $brand = isset($_POST['brand']) ? $_POST['brand'] : '';

                                        if($brand === 'Intel'){
                                            echo '<option value="0" data-keywords="" data-price="0">Integrált Videókártya</option>'; 
                                        } else {
                                            echo '<option value="0" data-keywords="" data-price="0">Nincs rá szükség</option>';
                                        }

                                        $gpu = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 3");

                                        while($row = mysqli_fetch_assoc($gpu)){
                                            echo '<option value="' . $row["product_id"] . '" data-keywords="' . $row["product_keywords"] . '" data-price="' . $row["product_price"] . '">' . $row["product_title"] . ' - ' . $row["product_price"] . 'Ft </option>';
                                        }
                                    ?>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <div id="gpukep">
                                    <?php
                                        $db = mysqli_connect("localhost","root","","pch_shop");

                                        $gpu = mysqli_query($db, "SELECT product_id,product_img1 from products WHERE p_cat_id = 3");

                                        while($row = mysqli_fetch_assoc($gpu)){
                                            echo '<img alt="'.$row["product_id"].'" src="admin_area/product_images/'.$row["product_img1"].'" class="minikep"></img>';
                                        }
                                    ?>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div id="gpumini">
                                        <?php
                                            $db = mysqli_connect("localhost","root","","pch_shop");

                                            $gpu = mysqli_query($db, "SELECT product_id,product_mini from products WHERE p_cat_id = 3");

                                            while($row = mysqli_fetch_assoc($gpu)){
                                                echo '<p id="'.$row["product_id"].'">'.$row["product_mini"].'</p>';
                                            }
                                        ?>
                                    </div>
                                </div>
                            </div>
                           
                            </div>

                            <h2>Háttértárak</h2>
                            <div class="form-group"> <!-- Háttértárak --> 
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>HDD</label>

                                            <select class="form-control" name="hdd" id="hdd">
                                            <?php
                                                echo '<option value="0" data-keywords="" data-price="0">Nincs rá szükség</option>';
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $hdd = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 5");

                                                while($row = mysqli_fetch_assoc($hdd)){
                                                    echo '<option value="' . $row["product_id"] . '" data-keywords="' . $row["product_keywords"] . '" data-price="' . $row["product_price"] . '" style="display: block">' . $row["product_title"] . ' - ' . $row["product_price"] . 'Ft </option>';
                                                }
                                            ?>
                                            </select>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="hddkep">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $hdd = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 5");

                                                while($row = mysqli_fetch_assoc($hdd)){
                                                    echo '<img alt="'.$row["product_id"].'" src="admin_area/product_images/'.$row["product_img1"].'" class="minikep"></img>';
                                                }
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="hddmini">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $hdd = mysqli_query($db, "SELECT product_id,product_mini from products WHERE p_cat_id = 5");

                                                while($row = mysqli_fetch_assoc($hdd)){
                                                    echo '<p id="'.$row["product_id"].'">'.$row["product_mini"].'</p>';
                                            }
                                            ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>SSD</label>

                                        <select class="form-control" name="ssd" id="ssd">
                                            <?php
                                                echo '<option value="0" data-keywords="" data-price="0">Nincs rá szükség</option>';
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $ssd = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 9");

                                                while($row = mysqli_fetch_assoc($ssd)){
                                                    echo '<option value="' . $row["product_id"] . '" data-keywords="' . $row["product_keywords"] . '" data-price="' . $row["product_price"] . '" style="display: block">' . $row["product_title"] . ' - ' . $row["product_price"] . 'Ft </option>';
                                                }
                                            ?>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="ssdkep">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $ssd = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 9");

                                                while($row = mysqli_fetch_assoc($ssd)){
                                                    echo '<img alt="'.$row["product_id"].'" src="admin_area/product_images/'.$row["product_img1"].'" class="minikep"></img>';
                                                }
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="ssdmini">
                                            <?php
                                                $db = mysqli_connect("localhost","root","","pch_shop");

                                                $ssd = mysqli_query($db, "SELECT product_id,product_mini from products WHERE p_cat_id = 9");

                                                while($row = mysqli_fetch_assoc($ssd)){
                                                    echo '<p id="'.$row["product_id"].'">'.$row["product_mini"].'</p>';
                                            }
                                            ?>
                                        </div>
                                    </div>
                                </div>
                            </div>

                           <div class="form-group"> <!-- Tápegység -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <h2>Tápegység</h2>

                                        <select class="form-control" name="tap" id="tap">
                                        <?php
                                            echo '<option value="0" data-keywords="" data-price="0">Nincs rá szükség</option>';
                                            $db = mysqli_connect("localhost","root","","pch_shop");

                                            $tap = mysqli_query($db, "SELECT * from products WHERE p_cat_id = 6");

                                            while($row = mysqli_fetch_assoc($tap)){
                                                echo '<option value="' . $row["product_id"] . '" data-keywords="' . $row["product_keywords"] . '" data-price="' . $row["product_price"] . '">' . $row["product_title"] . ' - ' . $row["product_price"] . 'Ft </option>';
                                            }
                                        ?>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="tapkep">
                                        <?php
                                            $db = mysqli_connect("localhost","root","","pch_shop");

                                            $tap = mysqli_query($db, "SELECT product_id,product_img1 from products WHERE p_cat_id = 6");

                                            while($row = mysqli_fetch_assoc($tap)){
                                                echo '<img alt="'.$row["product_id"].'" src="admin_area/product_images/'.$row["product_img1"].'" class="minikep"></img>';
                                            }
                                        ?>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div id="tapmini">
                                            <?php
                                            $db = mysqli_connect("localhost","root","","pch_shop");

                                            $tap = mysqli_query($db, "SELECT product_id,product_mini from products WHERE p_cat_id = 6");

                                            while($row = mysqli_fetch_assoc($tap)){
                                                echo '<p id="'.$row["product_id"].'">'.$row["product_mini"].'</p>';
                                            }
                                            ?>
                                        </div>
                                    </div>
                                </div>

                            <div id="minimum_tap"></div>
                           
                            </div>

                            <div id="osszeg"></div>
                            
                            <div id="osszalert"></div>
                           
                           <div class="text-center"><!-- text-center Begin -->
                               
                               <button type="submit" class="btn btn-primary">
                               
                               <i class="fa fa-user-md"></i> Alkatrészek hozzáadása
                               
                               </button>
                               
                           </div><!-- text-center Finish -->
                           
                       </form><!-- form Finish -->
                       
                   </div><!-- box-header Finish -->
                   
               </div><!-- box Finish -->
               
           </div><!-- col-md-9 Finish -->
           
       </div><!-- container Finish -->
   </div><!-- #content Finish -->
   
   <?php 
    
    include("includes/footer.php");
    
    ?>
    
<script src="js/jquery-331.min.js"></script>
<script src="js/bootstrap-337.min.js"></script>

<script src="js/pcc.js"></script>

</body>
</html>