<?php
session_start();

use Doctrine\Common\ClassLoader,
    Doctrine\ORM\Configuration,
    Doctrine\ORM\EntityManager,
    Doctrine\Common\Cache\ArrayCache,
    Doctrine\DBAL\Logging\EchoSQLLogger;

class Doctrine {

  public $em = null;

  public function __construct()
  {
    // load database configuration from CodeIgniter
    require_once APPPATH.'config/database.php';

    // Set up class loading. You could use different autoloaders, provided by your favorite framework,
    // if you want to.
    require_once APPPATH.'libraries/Doctrine/Common/ClassLoader.php';

    $doctrineClassLoader = new ClassLoader('Doctrine',  APPPATH.'libraries');
    $doctrineClassLoader->register();
    $entitiesClassLoader = new ClassLoader('models', rtrim(APPPATH, "/" ));
    $entitiesClassLoader->register();
    $proxiesClassLoader = new ClassLoader('Proxies', APPPATH.'models/proxies');
    $proxiesClassLoader->register();

    // Set up caches
    $config = new Configuration;
    $cache = new ArrayCache;
    $config->setMetadataCacheImpl($cache);
    $driverImpl = $config->newDefaultAnnotationDriver(array(APPPATH.'models/Entities'));
    $config->setMetadataDriverImpl($driverImpl);
    $config->setQueryCacheImpl($cache);

    $config->setQueryCacheImpl($cache);

    // Proxy configuration
    $config->setProxyDir(APPPATH.'/models/proxies');
    $config->setProxyNamespace('Proxies');

    // Set up logger
    $logger = new EchoSQLLogger;
 //   $config->setSQLLogger($logger);

    $config->setAutoGenerateProxyClasses( TRUE );

    // Database connection information for the external application
    //
    $connectionOptionsExternal = array(
        'driver' => 'pdo_'.$db['default']['dbdriver'],
        'user' =>     $db['default']['username'],
        'password' => $db['default']['password'],
        'host' =>     $db['default']['hostname'],
        'dbname' =>   $db['default']['database'],
        'path'  =>   $db['default']['database']    // just for SQLite Driver....WHY didn't they use the dbname?!
    );
    
    // Database connection information for the core_* tables
    //
    $connectionOptionsInternal = array(
        'driver' =>   'pdo_sqlite',
        'user' =>     "",
        'password' => "",
        'host' =>     "",
        'dbname' =>   "",
        'path'  =>   $sqlLitePath
    );

	// Create a session base database if we use the DEMO database.
	// Data will be lost if we logout or cleanup the the Browser Cache.
	//
	if(endsWith($connectionOptionsExternal['path'], "demo.sqlite")){
	   if(isset($_SESSION['verside_db_id'])){
		  $unique= $_SESSION['verside_db_id'];
		}
		else{
		  $unique = md5( uniqid() );
		  $_SESSION['verside_db_id']=$unique;
		}
		
		$internalDB_session = $connectionOptionsInternal['path']."_session_".$unique;
		$externalDB_session = $connectionOptionsExternal['path']."_session_".$unique;
		
		// The screen, menu and application definition
		//
		if (!file_exists($internalDB_session)) {
		  copy($connectionOptionsInternal['path'],$internalDB_session);
		}
		
		// The application data 
		//
		if (!file_exists($externalDB_session)) {
			copy($connectionOptionsExternal['path'],$externalDB_session);
		}
		
		$connectionOptionsInternal['path']=$internalDB_session;
		$connectionOptionsExternal['path']=$externalDB_session;
	}

    // Create EntityManager
    $this->emExternal = EntityManager::create($connectionOptionsExternal, $config);
    $this->emInternal = EntityManager::create($connectionOptionsInternal, $config);
    
    if($db['default']['dbdriver']=="mysql")
       $this->emExternal->getConnection()->exec('SET NAMES "UTF8"');
  }
}