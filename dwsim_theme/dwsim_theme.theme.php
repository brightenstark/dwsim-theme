<?php

function dwsim_theme_theme() {
  return [
    'page' => [
      'template' => 'page', // Registers page.html.twig
      'path' => 'templates',
    ],
  ];
}
/**
 * Implements hook_preprocess_page().
 */
function dwsim_theme_preprocess_page(&$variables) {
  // Add homepage-specific library
  if (\Drupal::service('path.matcher')->isFrontPage()) {
    $variables['#attached']['library'][] = 'dwsim_theme/homepage';
  }
  
  // Add body class for front page
  if (\Drupal::service('path.matcher')->isFrontPage()) {
    $variables['attributes']['class'][] = 'path-frontpage';
  }
  
  // Provide slider images for front page
  if (\Drupal::service('path.matcher')->isFrontPage()) {
    $variables['slider_images'] = [
      [
        'url' => '/path/to/image1.jpg',
        'alt' => 'DWSIM Simulation'
      ],
      [
        'url' => '/path/to/image2.jpg',
        'alt' => 'Chemical Process Diagram'
      ]
    ];
  }
}