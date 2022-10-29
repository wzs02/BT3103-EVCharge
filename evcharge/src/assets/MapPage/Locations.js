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
      },
      street: "50 Tanah Merah Ferry Road",
      postalCode: "Singapore 498833",
      imgName: "Map_498833",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "SP Group",
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
      },
      street: "78 Airport Boulevard",
      postalCode: "Singapore 819666",
      imgName: "Map_819666",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "SP Group",
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
      },
      street: "132 Simei Street 1",
      postalCode: "Singapore 520132",
      imgName: "Map_520132",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "BlueSG",
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
      },
      street: "89 Flora Drive",
      postalCode: "Singapore 506890",
      imgName: "Map_506890",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "Solacharge",
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
      street: "3 Tampines Central 1",
      postalCode: "Singapore 529540",
      imgName: "Map_529540",
      chargerDetails: {
        type: ["Type 2", "CCS/SAE Combo"],
        system: "CCS",
        provider: "TotalEnergies",
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
      },
      street: "69 Bedok South Avenue 3",
      postalCode: "Singapore 460069",
      imgName: "Map_460069",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "BlueSG",
      },
    },
  ],
  ikea_tampines: [
    {
      id: "IKEA Tampines",
      position: {
        lat: 1.3740664,
        lng: 103.9323985,
        //price: Free charging for 2h
        // 4 parking lots, type 2 mennekes
      },
      street: "60 Tampines North Drive 2",
      postalCode: "Singapore 528764",
      imgName: "Map_528764",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "IKEA",
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
      },
      street: "512 Joo Chiat Road",
      postalCode: "Singapore 427695",
      imgName: "Map_427695",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "SP Group",
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
      },
      street: "18 Kaki Bukit Road 3",
      postalCode: "Singapore 417818",
      imgName: "Map_417818",
      chargerDetails: {
        type: ["Type 2", "CCS/SAE Combo"],
        system: "CCS",
        provider: "SP Group",
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
      },
      street: "98 Paya Lebar Road",
      postalCode: "Singapore 409008",
      imgName: "Map_409008",
      chargerDetails: {
        type: ["Type 2, CCS/SAE"],
        system: "CCS",
        provider: "Shell",
      },
    },
  ],

  amk_charge_plus: [
    {
      id: "Charge+ 260 Ang Mo Kio Street 21",
      position: {
        lat: 1.3689746856689453,
        lng: 103.83489990234375,
        // price: not stated
        // 3 lots type 2 mennekes
      },
      street: "260 Ang Mo Kio Street 21",
      postalCode: "Singapore 560260",
      imgName: "Map_560260",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "Charge+",
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
      street: "35 Jalan Pemimpin",
      postalCode: "Singapore 577176",
      imgName: "Map_577176",
      chargerDetails: {
        type: ["CCS/SAE"],
        system: "CCS",
        provider: "Juice+",
      },
      // price:not stated
      // 1 lot CCS/SAE
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
      },
      street: "324 Thomson Road",
      postalCode: "Singapore 307672",
      imgName: "Map_307672",
      chargerDetails: {
        type: ["Type 2", "CCS/SAE"],
        system: "CCS",
        provider: "Shell",
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
      },
      street: "170 Upper Bukit Timah Road",
      postalCode: "Singapore 588179",
      imgName: "Map_588179",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "LHN Energy",
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
      },
      street: "311 Clementi Avenue 4",
      postalCode: "Singapore 120311",
      imgName: "Map_120311",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "CDG Energie",
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
      },
      street: "70 Amoy Street",
      postalCode: "Singapore 069889",
      imgName: "Map_069889",
      chargerDetails: {
        type: ["CCS/SAE"],
        system: "CCS",
        provider: "TotalEnergies",
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
      },
      street: "300 Beach Road",
      postalCode: "Singapore 199555",
      imgName: "Map_199555",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "TotalEnergies",
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
      street: "440 Fernvale Link",
      postalCode: "Singapore 790440",
      imgName: "Map_790440",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "Charge+",
      },
      // $0.4926/kWh
      // 3 lots type 2 mennekes
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
      },
      street: "966A Hougang Avenue 9",
      postalCode: "Singapore 531966",
      imgName: "Map_531966",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "BlueSG",
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
      // $0.55/kWh
      // 1 lot CCS/SAE, 1 lot type 2 mennekes
      street: "49 Serangoon Garden Way",
      postalCode: "Singapore 555944",
      imgName: "Map_555944",
      chargerDetails: {
        type: ["Type 2", "CCS/SAE"],
        system: "CCS",
        provider: "Shell",
      },
    },
  ],
  boathouse_residence_solacharge: [
    {
      id: "Boathouse Residence Solacharge",
      position: {
        lat: 1.3749250173568726,
        lng: 103.90314483642578,
        //price: $0.60/kWh
        //5 lots type 2 mennekes
      },
      street: "29 Upper Serangoon View",
      postalCode: "Singapore 534046",
      imgName: "Map_534046",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "Solacharge",
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
      },
      street: "821 Punggol Road",
      postalCode: "Singapore 829169",
      imgName: "Map_829169",
      chargerDetails: {
        type: ["Type 2", "CCS/SAE"],
        system: "CCS",
        provider: "Shell",
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
      },
      street: "32 Pioneer Crescent",
      postalCode: "Singapore 628561",
      imgName: "Map_628561",
      chargerDetails: {
        type: ["Type 2", "CCS/SAE"],
        system: "CCS",
        provider: "Total Energies",
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
      },
      street: "347 Choa Chu Kang Avenue 4",
      postalCode: "Singapore 680442",
      imgName: "Map_680442",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "BlueCharge",
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
      },
      street: "Blk 451 Bukit Batok West Avenue 6",
      postalCode: "Singapore 650451",
      imgName: "Map_650451",
      chargerDetails: {
        type: ["Type 2"],
        system: "CCS",
        provider: "CDG Engie",
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
      },
      street: "1 Jurong West Central 2",
      postalCode: "Singapore 648886",
      imgName: "Map_648886",
      chargerDetails: {
        type: ["Commando"],
        system: "CCS",
        provider: "TotalEnergies",
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
      },
      street: "15 Woodlands Loop",
      postalCode: "Singapore 738322",
      imgName: "Map_738322",
      chargerDetails: {
        type: ["J-1772"],
        system: "ChadeMO",
        provider: "Shell",
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
      },
      street: "80 Mandai Lake Road",
      postalCode: "Singapore 729826",
      imgName: "Map_729826",
      chargerDetails: {
        type: ["Type 2", "CCS/SAE"],
        system: "CCS",
        provider: "TotalEnergies",
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
      },
      street: "10 Science Park Drive",
      postalCode: "Singapore 118224",
      imgName: "Map_118224",
      chargerDetails: {
        type: ["Type 2", "CCS/SAE"],
        system: "CCS",
        provider: "SP Group",
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
      },
      street: "1 Jalan Kilang Barat",
      postalCode: "Singapore 159345",
      imgName: "Map_159345",
      chargerDetails: {
        type: ["CCS/SAE"],
        system: "CCS",
        provider: "TotalEnergies",
      },
    },
  ],
};

export { locationVar };
