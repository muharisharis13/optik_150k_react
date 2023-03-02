import { useForm, useWatch} from "react-hook-form";
import styled from "styled-components";
import queryString from "query-string";
import {useQuery} from "react-query"
import { kwitansiAPI } from "../../../../API";
import { Loading } from "@utils";
import { useEffect } from "react";

const KwitansiPrint = () => {
  const paramSearch =queryString.parse(location.search)
  const { control, setValue, register, resetField, handleSubmit, reset } = useForm({
    defaultValues:{
      color_array:["168, 168, 50,.6", "244, 156, 247,.6", "247, 159, 156,.6", "155, 228, 250,.6", "164, 242, 148,.6"],
    }
  })

  const bg_image_obj = {
    0:"url(/assets/kwitansi_bg/1.png)",
    1:"url(/assets/kwitansi_bg/2.png)",
    2:"url(/assets/kwitansi_bg/3.png)",
    3:"url(/assets/kwitansi_bg/4.png)",
    4:"url(/assets/kwitansi_bg/5.png)"
  }
  const color_array = useWatch({
    control,
    name:"color_array"
  })


  const {data, isLoading} = useQuery({
    queryKey:["getDetailKwitansiPrint"],
    queryFn:()=>kwitansiAPI.getDetailKwitansi(paramSearch?.kwitansi_id)
  })

  
  Loading(isLoading)

  useEffect(()=>{
    print()
  },[])

  return (

    <Container style={{ backgroundColor:`rgba(${ color_array[paramSearch?.versi-1]})` }}className="container">
      <div className="card-body mb-4" style={{ backgroundImage:bg_image_obj[paramSearch?.versi-1], backgroundRepeat:"no-repeat", backgroundPosition:"center",backgroundSize:"100%, cover"}}>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            opacity: "0.8",
          }} 
          className="border"
        ></div>
        <div className="d-flex-column" >
          <div className="border-bottom-line col-sm-3 pl-0">
            <span>No. {data?.kwitansi_code}</span>
          </div>
          <div className="col-sm-12 border-bottom-dot pl-0">
            <span>Sudah Diterima Dari</span>
          </div>
          <div className="row align-items-center">
            <div className="col-sm-2">
              <span>Banyaknya Uang</span>
            </div>
            <div className="col-sm-10">
              <hr />
              <hr />
              <hr />
              <hr />
            </div>
          </div>
          <div className="col-sm-12 border-bottom-dot pl-0">
            <span>Untuk Pembayaran</span>
          </div>
          <div className="col-sm-12 border-bottom-dot pl-0">
            <span>&nbsp;</span>
          </div>
          <div className="col-sm-12 border-bottom-dot pl-0">
            <span>&nbsp;</span>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-sm-3 ">
            <h2 className="font-italic">Jumlah Rp</h2>
          </div>
          <div className="col-sm-3">
            <hr />
            <hr />
            <hr />
            <hr />
          </div>
        </div>
      </div>
    </Container>

  );
};
export default KwitansiPrint;


const Container = styled.div `
body {
 
}
color: #000;
font-style: italic;
-webkit-print-color-adjust: exact !important;
print-color-adjust: exact !important;

.bg-opacity {
  background-color: rgba(237, 206, 138, .3);
}

.border-bottom-line {
  border-bottom: 2px dashed #000;
  margin-bottom: 2%;
  border-bottom-style: double;
}

.border-bottom-dot {
  border-bottom: 2px dashed #000;
  margin-bottom: 2%;
  border-bottom-style: dashed;
}

table tr td {
  border-bottom: 1px solid black;
}

hr {
  display: block;
  height: -20%;
  border: 0;
  border-top: 1px solid #000;
  margin: 10px 0;
  padding: 0;
}

@media print {
  @page {
      size: landscape
  }
}
`
