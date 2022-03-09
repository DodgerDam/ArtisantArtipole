<?php

namespace App\Controller;

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
        return $this->render('artisant/home.html.twig',[
            'title' => "bienvenue sur cette page",
            'age' => 20,
        ]);
    }
}
