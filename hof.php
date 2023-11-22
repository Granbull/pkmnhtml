<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css"> <!-- Add your custom CSS file here -->
    <title>Hall of Fame</title>
    <style type="text/css">
   #content{
        width: 100%;
        margin: 20px auto;
        border: 1px solid #cbcbcb;
   }
   form{
        width: 50%;
        margin: 20px auto;
   }
   form div{
        margin-top: 5px;
   }
   #img_div{
        width: 80%;
        padding: 5px;
        margin: 15px auto;
        border: 1px solid #cbcbcb;
   }
   #img_div:after{
        content: "";
        display: block;
        clear: both;
   }
   img{
        float: left;
        margin: 5px;
        width: 500px;
        height: 281px;
        border-radius: 10px;
   }
  #icon{
    float: left;
    width: 30px;
    height: 30px;
   }
   #bannerhof{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
   }
</style>
</head>
<body>
    <!-- Header -->
    <nav class="navbar navbar-pink navbar-expand-md">
        <div class="container">
            <a class="navbar-brand" href="main.html"><img src="icon.gif" alt="Icon Image" id="icon"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                        <a class="nav-link" href="pokedex.html">[Speed Dex]</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="EV.html">[Comparador]</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="qeep.html">[Quem é esse Pokémon?]</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="hof.php">[Hall of Fame]</a>
                    </li>
                </ul>
            </div>
            <div class="ml-auto d-none d-md-block">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">[Login]</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">[Registro]</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container mt-4 custom-container">
    <?php
  // Create database connection
  $db = mysqli_connect("localhost", "root", "", "image_upload");

  // Initialize message variable
  $msg = "";

  // If upload button is clicked ...
  if (isset($_POST['upload'])) {
        // Get image name
        $image = $_FILES['image']['name'];
        // Get text
        $image_text = mysqli_real_escape_string($db, $_POST['image_text']);

        // image file directory
        $target = "images/".basename($image);

        $sql = "INSERT INTO images (image, image_text) VALUES ('$image', '$image_text')";
        // execute query
        mysqli_query($db, $sql);

        if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
                $msg = "Image uploaded successfully";
        }else{
                $msg = "Failed to upload image";
        }
  }
  $result = mysqli_query($db, "SELECT * FROM images");
?>
<!DOCTYPE html>
<html>
<head>
<title>Image Upload</title>
</head>
<body>
<div id="content">
  <?php
    while ($row = mysqli_fetch_array($result)) {
      echo "<div id='img_div'>";
        echo "<img src='images/".$row['image']."' >";
        echo "<p>".$row['image_text']."</p>";
      echo "</div>";
    }
  ?>
  <form method="POST" action="hof.php" enctype="multipart/form-data">
        <input type="hidden" name="size" value="1000000">
        <div>
          <input type="file" name="image">
        </div>
        <div>
      <textarea 
        id="text" 
        cols="40" 
        rows="4" 
        name="image_text" 
        placeholder="Digite uma descrição para seu Pokémon!"></textarea>
        </div>
        <div>
                <button type="submit" name="upload">POSTAR</button>
        </div>
  </form>
  </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  </div>
  <footer class="footer">
            <div class="container">
                <p>Trabalho de HTML para Estácio</p>
                <p>Feito com <i class="bi bi-heart-fill text-danger">♥</i> por Gabriel "Bim" Guedes</p>
            </div>
        </footer>
  </body>
</html>