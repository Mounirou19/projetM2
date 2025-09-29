<?php

namespace App;

use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Component\HttpKernel\Kernel as BaseKernel;

/**
 * Kernel principal de l'application CinéManga
 * 
 * Cette classe constitue le point d'entrée de l'application Symfony.
 * Elle utilise le MicroKernelTrait pour une configuration simplifiée
 * et gère le bootstrap de l'application.
 * 
 * @author Mounirou
 * @version 1.0
 */
class Kernel extends BaseKernel
{
    use MicroKernelTrait;
}
