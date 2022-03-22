<?php

namespace App\Controller;

use PDO;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ArtisantController extends AbstractController
{
    /**
     * @Route("/artisant", name="app_artisant")
     */
    public function index(): Response
    {
        return $this->render('artisant/index.html.twig', [
            'controller_name' => 'ArtisantController',
        ]);
    }

    /**
     * 
     * @route("/", name="home")
     */
    public function home()
    {
        $pdo = new PDO('mysql:host=localhost;dbname=scabotheque;port=3306;charset=utf8', 'root',  'root');
        
        $sth2 = $pdo->prepare("SELECT count(*) as cnt FROM adherent");
        $sth2->execute();
        $nbAdh = $sth2->fetchAll(PDO::FETCH_ASSOC);

        return $this->render('artisant/home.html.twig',[
            'title' => "bienvenue sur cette page",
            'age' => $nbAdh[0]['cnt'],
        ]);
    }
}
