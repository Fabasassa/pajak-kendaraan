let tipeKendaraan = {
  motor: {
    Honda: {
      Beat: {
        harga: 11600000,
        mesin: 110,
        warna: ["hitam", "putih", "merah"],
      },
      Vario: {
        harga: 25500000,
        mesin: 157,
        warna: ["hitam", "putih", "merah"],
      },
    },
    Yamaha: {
      Fino: {
        harga: 18740000,
        mesin: 125,
        warna: ["hitam", "putih", "merah"],
      },
      aerox: {
        harga: 24795000,
        mesin: 155,
        warna: ["hitam", "putih", "merah"],
      },
    },
    Suzuki: {
      Smash: {
        harga: 14300000,
        mesin: 113,
        warna: ["hitam", "putih", "merah"],
      },
      Spin: {
        harga: 3000000,
        mesin: 125,
        warna: ["hitam", "putih", "merah"],
      },
    },
    Vespa: {
      Piagio: {
        harga: 47700000,
        mesin: 150,
        warna: ["hitam", "putih", "merah"],
      },
      Vespa: {
        harga: 41500000,
        mesin: 125,
        warna: ["hitam", "putih", "merah"],
      },
    },
    Harley: {
      Harley: {
        harga: 100000000,
        mesin: 100,
        warna: ["hitam", "putih", "merah"],
      },
    },
  },
  mobil: {
    Honda: {
      Jazz: {
        harga: 256500000,
        warna: ["hitam", "putih", "merah"],
      },
      Brio: {
        harga: 156900000,
        warna: ["hitam", "putih", "merah"],
      },
    },
    Toyota: {
      Pajero: {
        harga: 529600000,
        warna: ["hitam", "putih", "merah"],
      },
      Yaris: {
        harga: 295800000,
        warna: ["hitam", "putih", "merah"],
      },
    },
    Daihatsu: {
      Ayla: {
        harga: 110000000,
        warna: ["hitam", "putih", "merah"],
      },
      Luxio: {
        harga: 257000000,
        warna: ["hitam", "putih", "merah"],
      },
    },
  },
}

// Nilai awal
let output = {
  selectedOptionJenis: 0,
  selectedOptionMerek: 0,
  selectedOptionVarian: 0,
  selectedOptionWarna: 0,
  pkb: 0,
  bbnkb: 0,
  swdkllj: 0,
  admstnk: 0,
  admtnkb: 0,
  birojasa: 0,
}

// Util function
const renderOptionElement = (
  arr,
  selectElement,
  optionDefaultText = "none"
) => {
  if (arr === "none")
    return (selectElement.innerHTML = `<option value="none">${optionDefaultText}</option>`)

  selectElement.innerHTML = `<option value="none">${optionDefaultText}</option>`
  arr.forEach((el) => {
    selectElement.innerHTML += `<option value="${el}">${el}</option>`
  })
}

const renderRincian = () => {
  const {
    selectedOptionJenis,
    selectedOptionMerek,
    selectedOptionVarian,
    selectedOptionWarna,
  } = output

  const kendaraan =
    tipeKendaraan[selectedOptionJenis][selectedOptionMerek][
      selectedOptionVarian
    ]
  const resultOutput = calcTotalPajak(
    selectedOptionJenis,
    kendaraan.harga,
    selectedOptionJenis === "motor" && kendaraan.mesin
  )

  const articleContent = `
		<div class="card">
			<div class="card-body">
				<h6 class="card-subtitle mb-2 text-muted">${selectedOptionJenis.toUpperCase()} | ${selectedOptionMerek.toUpperCase()} | ${selectedOptionWarna.toUpperCase()}</h6>
				<h5 class="card-title">${selectedOptionVarian}</h5>
				<ul class="list-group list-group-flush mt-3">
					<li class="list-group-item">PKB : ${resultOutput.pkb.toLocaleString()}</li>
					<li class="list-group-item">BBNKB : ${resultOutput.bbnkb.toLocaleString()}</li>
					<li class="list-group-item">SWDKLLJ : ${resultOutput.swdkllj.toLocaleString()}</li>
					<li class="list-group-item">Admin STNK : ${resultOutput.admstnk.toLocaleString()}</li>
					<li class="list-group-item">Admin TNKB : ${resultOutput.admtnkb}</li>
					<li class="list-group-item">Biro Jasa : ${resultOutput.birojasa.toLocaleString()}</li>
					<li class="list-group-item font-weight-bold">Total Pajak : ${resultOutput.total.toLocaleString()}</li>
				</ul>
			</div>
		</div>
	`

  ARTICLE.innerHTML = articleContent
}

const getSelectedOptionValue = (childOrOption) => {
  const childKey = Object.keys(childOrOption)
  const selectedOptionIndex = childKey.find((el) => childOrOption[el].selected)

  return childOrOption[selectedOptionIndex].value
}

const calcPKB = (harga) => (harga * 2) / 100

const calcBBNKB = (harga) => (harga * 10) / 100

const calcSWDKLLJ = (jenis, mesin) => {
  if (jenis === "motor") {
    if (mesin < 50) return 3000
    if (mesin < 250) return 35000

    return 83000
  }

  return 143000
}

const calcADMSTNK = (jenis) => (jenis === "motor" ? 100000 : 200000)

const calcADMTNKB = (jenis) => (jenis === "motor" ? 60000 : 100000)

const calcBiroJasa = (harga) => (harga * 10) / 100

const calcTotalPajak = (jenis, harga, mesin = 0) => {
  output.pkb = calcPKB(harga)
  output.bbnkb = calcBBNKB(harga)
  output.swdkllj = calcSWDKLLJ(jenis, mesin)
  output.admstnk = calcADMSTNK(jenis)
  output.admtnkb = calcADMTNKB(jenis)
  output.birojasa = calcBiroJasa(harga)

  let { pkb, bbnkb, swdkllj, admstnk, admtnkb, birojasa } = output
  output.total = harga + (pkb + bbnkb + swdkllj + admstnk + admtnkb + birojasa)

  return output
}

const isAllOptionSelected = (
  selectedOptionJenis,
  selectedOptionMerek,
  selectedOptionVarian,
  selectedOptionWarna
) => {
  return (
    selectedOptionJenis &&
    selectedOptionMerek &&
    selectedOptionVarian &&
    selectedOptionWarna
  )
}

// Element DOM
const INPUT_JENIS = document.getElementById("jenis")
const INPUT_MEREK = document.getElementById("merek")
const INPUT_VARIAN = document.getElementById("varian")
const INPUT_WARNA = document.getElementById("warna")

const BTN_CEK_PAJAK = document.getElementById("btn-cek-pajak")
const BTN_RESET = document.querySelector('button[type="reset"]')

const ARTICLE = document.querySelector("#out")

// Render Option Jenis
const tipeKendaraanKey = Object.keys(tipeKendaraan)
renderOptionElement(tipeKendaraanKey, INPUT_JENIS, "Tipe kendaraan")

INPUT_JENIS.addEventListener("change", function () {
  const child = INPUT_JENIS.children
  output.selectedOptionJenis = getSelectedOptionValue(child)
  const { selectedOptionJenis } = output

  if (selectedOptionJenis !== "none") {
    const merekKey = Object.keys(tipeKendaraan[selectedOptionJenis])
    renderOptionElement(merekKey, INPUT_MEREK, "Merek")
  } else {
    output.selectedOptionMerek = 0
    renderOptionElement("none", INPUT_MEREK, "Merek")
  }
})

INPUT_MEREK.addEventListener("change", function () {
  const child = INPUT_MEREK.children
  output.selectedOptionMerek = getSelectedOptionValue(child)
  const { selectedOptionJenis, selectedOptionMerek } = output

  if (selectedOptionMerek !== "none" && selectedOptionJenis !== "none") {
    const varianKey = Object.keys(
      tipeKendaraan[selectedOptionJenis][selectedOptionMerek]
    )
    renderOptionElement(varianKey, INPUT_VARIAN, "Kendaraan")
  } else {
    output.selectedOptionVarian = 0
    renderOptionElement("none", INPUT_VARIAN, "Kendaraan")
  }
})

INPUT_VARIAN.addEventListener("change", function () {
  const child = INPUT_VARIAN.children
  output.selectedOptionVarian = getSelectedOptionValue(child)
  const { selectedOptionJenis, selectedOptionMerek, selectedOptionVarian } =
    output

  if (selectedOptionVarian !== "none") {
    const { warna } =
      tipeKendaraan[selectedOptionJenis][selectedOptionMerek][
        selectedOptionVarian
      ]
    renderOptionElement(warna, INPUT_WARNA, "Warna")
  } else {
    output.selectedOptionWarna = 0
    renderOptionElement("none", INPUT_WARNA, "Warna")
  }
})

INPUT_WARNA.addEventListener("change", function () {
  const child = INPUT_WARNA.children
  output.selectedOptionWarna = getSelectedOptionValue(child)
})

BTN_CEK_PAJAK.addEventListener("click", function (e) {
  e.preventDefault()
  const {
    selectedOptionJenis,
    selectedOptionMerek,
    selectedOptionVarian,
    selectedOptionWarna,
  } = output

  if (
    isAllOptionSelected(
      selectedOptionJenis,
      selectedOptionMerek,
      selectedOptionVarian,
      selectedOptionWarna
    )
  )
    return renderRincian()

  ARTICLE.innerHTML = `
		<div class="alert alert-danger" role="alert">
			Semua pilihan input harus di pilih!
		</div>
	`
})

BTN_RESET.addEventListener("click", function () {
  ARTICLE.innerHTML = ``
  output = {
    selectedOptionJenis: 0,
    selectedOptionMerek: 0,
    selectedOptionVarian: 0,
    selectedOptionWarna: 0,
    pkb: 0,
    bbnkb: 0,
    swdkllj: 0,
    admstnk: 0,
    admtnkb: 0,
    birojasa: 0,
  }
})
