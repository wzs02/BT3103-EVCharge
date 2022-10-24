// LOCATION AND POS DETAILS FOR ALL CHARGERS STORED IN VARIABLE BELOW
var locationVar = {
  tanah_merah_ft: [
    {
      id: "SP Group: Tanah Merah Ferry Terminal",
      position: {
        lat: 1.3147629499435425,
        lng: 103.98895263671875,
        //price: $0.4366
        // 5 parking lots type 2 mennekes
        // 50 Tanah Merah Ferry Rd, SG 498833
      },
    },
  ],
  sp_group_jewel: [
    {
      id: "SP Group: Jewel Changi Airport",
      position: {
        lat: 1.3588186502456665,
        lng: 103.98931121826172,
        //price: $0.50/kwh
        // 6 parking lots, type 2 mennekes
        // 78 Airport Boulevard, SG 819666
      },
    },
  ],
  blue_sg_simei_s1: [
    {
      id: "Blue SG Simei Street 1",
      position: {
        lat: 1.3469521,
        lng: 103.9561507,
        // price: Require blueSG membership, $1 for 1st 3h, $2/hr after
        // 3 parking lots, type 2 mennekes
        // 132 Simei Street 1, Singapore 520132
      },
    },
  ],
  hedges_solacharge: [
    {
      id: "Hedges Park Solacharge",
      position: {
        lat: 1.353751301765442,
        lng: 103.9672622680664,
        //price: $0.60/kwh
        //2 parking lots, type 2 mennekes
        // 89 Flora Drive, SG 506890
      },
    },
  ],
  tamp_plaza: [
    {
      id: "Tampines Plaza",
      position: {
        lat: 1.3527475595474243,
        lng: 103.9432144165039,
        //price: $0.3930 SGD/kWh
        // 4 parking lots, type 2 mennekes, CCS/SAE 4 lots
      },
    },
  ],
  bedok_south: [
    {
      id: "Blue SG Bedok South",
      position: {
        lat: 1.3200629949569702,
        lng: 103.94429779052734,
        // price: Require blueSG membership, $1 for 1st 3h, $2/hr after
        // 4 parking lots, type 2 mennekes
        // 69 Bedok South Ave 3 SG 460069
      },
    },
  ],
  ikea_tampines: [
    {
      id: "Ikea Tampines",
      position: {
        lat: 1.3740664,
        lng: 103.9323985,
        //price: Free charging for 2h
        // 4 parking lots, type 2 mennekes
        // 60 Tampines North Drive 2, SG 528764
      },
    },
  ],
  i12_katong: [
    {
      id: "SP Group: i12 Katong",
      position: {
        lat: 1.3132948,
        lng: 103.8996129,
        //price: $0.4366/kWh
        //  2 parking lots, type 2 mennekes
        // 512 Joo Chiat Rd, SG 427695
      },
    },
  ],
  ent_biz_center: [
    {
      id: "SP Group: Entrepreneur Business Centre",
      position: {
        lat: 1.337632417678833,
        lng: 103.90296173095703,
        //price: $0.5/kWh
        // 1 lot type 2 mennekes, 1 lot CCS/SAE
        // 18 Kaki Bukit Rd 3 SG 417818
      },
    },
  ],
  shell_pl: [
    {
      id: "Shell Paya Lebar",
      postion: {
        lat: 1.3215305805206299,
        lng: 103.89131927490234,
        //price: $0.55/kWh
        // 1 lot type 2 mennekes, 1 lot CCS/SAE
        // 98 Paya Lebar Rd, SG 409008
      },
    },
  ],

  //CENTRAL
  amk_charge_plus: [
    {
      id: "Charge+ 260 Ang Mo Kio Street 21",
      position: {
        lat: 1.3689746856689453,
        lng: 103.83489990234375,
        // price: not stated
        // 3 lots type 2 mennekes
        // 260 AMK Street 21 SG 560260
      },
    },
  ],
  juice_plus_bishan: [
    {
      id: "Juice+: Wedge Mount Industrial Building",
      position: {
        lat: 1.34938645362854,
        lng: 103.84042358398438,
      },
      // price:not stated
      // 1 lot CCS/SAE
      // 35 Jln Pemimpin SG 577176
    },
  ],
  shell_thomson: [
    {
      id: "Shell Thomson",
      position: {
        lat: 1.3240904808044434,
        lng: 103.84191131591797,
        //price: $0.55kWh
        // 1 lot type 2 mennekes 1 lot CCS/SAE
        // 324 Thomson Road, SG 307672
      },
    },
  ],
  lhn_energy_btsc: [
    {
      id: "LHN Energy BTSC",
      position: {
        lat: 1.3433425,
        lng: 103.7757827,
        // price not stated
        // 4 lots type 2 mennekes
        // 170 upper bukit timah road, SG 588179
      },
    },
  ],
  cdg_energie_clementi_ave4: [
    {
      id: "CDG Energie Clementi Ave 4",
      position: {
        lat: 1.3193493,
        lng: 103.7651467,
        // $0.52/kWh
        //3 lots type 2 mennekes
        //311 clementi ave 4, SG 120311
      },
    },
  ],
  ura_centre_east_wing: [
    {
      id: "URA Centre (East Wing)",
      position: {
        lat: 1.2824753522872925,
        lng: 103.8479995727539,
        //price: $0.55/kWh
        // 2 lots CCS/SAE
        // 70 Amoy Street SG 069889
      },
    },
  ],
  the_concourse: [
    {
      id: "The Concourse",
      position: {
        lat: 1.3014713525772095,
        lng: 103.86231994628906,
        //price: $3/h
        //1 lot type 2 mennekes
        // 300 Beach Road 199555
      },
    },
  ],
  charge_plus_fernvale: [
    {
      id: "Charge+: Blk 400 (MSCP) Fernvale Link",
      position: {
        lat: 1.3928936,
        lng: 103.8783191,
      },
      // $0.4926/kWh
      // 3 lots type 2 mennekes
      // 440 Fernvale Link, SG 790440
    },
  ],
  blue_sg_hougang: [
    {
      id: "Blue SG Blk 966A Hougang Ave 9",
      position: {
        lat: 1.3750444650650024,
        lng: 103.8777847290039,
        // price: Require blueSG membership, $1 for 1st 3h, $2/hr after
        // 4 parking lots, type 2 mennekes
        // 966A Hougang Ave 9 SG 531966
      },
    },
  ],
  shell_serangoon_garden: [
    {
      id: "Shell Serangoon Gardens",
      position: {
        lat: 1.3623438,
        lng: 103.8733687,
      },
    },
  ],

  //WEST
  boathouse_residence_solacharge: [
    {
      id: "Boathouse Residence Solacharge",
      position: {
        lat: 1.3749250173568726,
        lng: 103.90314483642578,
        //price: $0.60/kWh
        //5 lots type 2 mennekes
        // 29 Upper Serangoon View SG 534046
      },
    },
  ],
  shell_punggol: [
    {
      id: "Shell Punggol",
      position: {
        lat: 1.4045712,
        lng: 103.9066554,
        //price: $0.55/kWh
        //1 lot type 2 mennekes, 1 lot CCS/SAE
        // 821 Punggol Rd, SG 829169
      },
    },
  ],
  westpark_biz_central: [
    {
      id: "West Park BizCentral",
      position: {
        lat: 1.3129089,
        lng: 103.6606577,
        //price: $0.3930/kWh
        // 2 lots type 2 mennekes, 2 lots CCS/SAE
        //32 Pioneer Crescent, SG 628561
      },
    },
  ],
  bluecharge_lot1: [
    {
      id: "Bluecharge: Lot 1 Mall",
      position: {
        lat: 1.3797335,
        lng: 103.7375352,
        // price: Require bluecharge membership, $1 for 1st 3h, $2/hr after
        // 4 parking lots, type 2 mennekes
        // 347 Choa Chu Kang Avenue 4 sg 680442
      },
    },
  ],
  cdg_engie_bukit_batok: [
    {
      id: "CDG Engie Blk 451 Bukit Batok West Ave 6",
      position: {
        lat: 1.353394,
        lng: 103.7427833,
        //price: $0.50/kWh
        //3 lots, type 2 mennekes
        // blk 451 bukit batok west ave 6
      },
    },
  ],
  jurong_point: [
    {
      id: "Jurong Point",
      position: {
        lat: 1.3394964,
        lng: 103.705254,
        //price: not stated
        // 2 lots, commando
        //1 Jurong West Central 2, Jurong Point, SG 648886
      },
    },
  ],
  shell_dunearn_uni: [
    {
      id: "Shell Dunearn University",
      position: {
        lat: 1.3233424,
        lng: 103.8180094,
        // price not stated
        // 1 lot J-1772
        //15 Woodlands Loop, SG 738322
      },
    },
  ],
  sg_zoo: [
    {
      id: "Singapore Zoo",
      position: {
        lat: 1.4037076,
        lng: 103.7940374,
        // $0.4725/kWh
        // 8 lots type 2 mennekes, 2 lots CCS/SAE
        // 80 Mandai Lake Road SG 729826
      },
    },
  ],
  ascent_building_sp_group: [
    {
      id: "Ascent Building SP Group",
      postion: {
        lat: 1.2920537,
        lng: 103.7842374,
        // $0.4153/kWh
        // 1 lot type 2 mennekes 1 lot ccs/sae
        // 10 Science Park Drive, SG 118224
      },
    },
  ],
  one_at_redhill_centre: [
    {
      id: "One@Redhill Centre",
      position: {
        lat: 1.2849739,
        lng: 103.8085048,
        // $0.42/kWh
        // 2 lots CCS/SAE
        // 1 Jln Kilang Barat, SG 159345
      },
    },
  ],
};

export { locationVar };
