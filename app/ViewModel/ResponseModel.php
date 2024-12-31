<?php 

    namespace App\ViewModel;
/**
 * Response Model
 * @template T
 */
class ResponseModel{
    /**
     * generic type
     * @var T
     */
    public $data;
    public int $status;
    public string $message;
    public function __construct(){

    }
    public function fillData(int $status,string $message, $data){
        $this->status = $status;
        $this->message = $message;
        $this->data = $data;
    }

    public static function of(int $status,string $message, $data){
        $res= new ResponseModel();
        $res->status = $status;
        $res->message = $message;
        $res->data = $data;
        return $res;
    }
}


