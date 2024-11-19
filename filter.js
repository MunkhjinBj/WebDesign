const day = [
  { id: 1, name: 1 },
  { id: 2, name: 2 },
  { id: 4, name: 4 },
  { id: 5, name: 5 },
];

const destinationtype = [
  { id: 1, type: "Адал явдалт" },
  { id: 2, type: "Тайван амралт" },
  { id: 3, type: "Соёлын аялал" },
  { id: 4, type: "Гэр бүлд зориулсан" },
  { id: 5, type: "Романтик" },
];

// Аяллын жишээ мэдээлэл
const travels = [
  {
    id: 1,
    title: "Хөвсгөл нуурын аялал",
    image: "./images/Khuvsgul_lake.jpg",
    type: "Адал явдалт",
    startDate: "2024-06-24",
    finishDate: "2024-06-26",
    date: 2,
    status: "Боломжтой",
  },
  {
    id: 2,
    title: "Говь гурван сайхан",
    image: "./images/Gobi_desert.jpg",
    type: "Тайван амралт",
    startDate: "2024-07-10",
    finishDate: "2024-07-15",
    date: 5,
    status: "Дууссан",
  },
  {
    id: 3,
    title: "Тэрэлжийн аялал",
    image: "./images/Terelj.jpg",
    type: "Гэр бүлд зориулсан",
    startDate: "2024-05-01",
    finishDate: "2024-05-03",
    date: 3,
    status: "Шинэ",
  },
];

// Шүүлтүүрийн үр дүнг харуулах функц
function filterTravels(filters) {
  console.log("Filters applied:", filters); // Debugging step

  const filteredTravels = travels.filter(
    (travel) =>
      (!filters.days || filters.days.includes(travel.date)) &&
      (!filters.types || filters.types.includes(travel.type))
  );

  console.log("Filtered travels:", filteredTravels); // Debugging step

  return filteredTravels
    .map(
      (p) => `
          <article>
            <h2>${p.title}</h2>
            <img src="${p.image}" alt="${p.title}" style="width: 200px;" />
            <p>${p.startDate} - ${p.finishDate}</p>
            <p>Төрөл: ${p.type}</p>
            <p>Статус: ${p.status}</p>
          </article>
        `
    )
    .join("");
}

// Example filters

// DOM-д өгөгдлийг нэмэх
const travelsContainer = document.querySelector(".travels");

if (travelsContainer) {
  const content = filterTravels(filters);
  console.log("Generated HTML:", content); // Debugging step

  travelsContainer.innerHTML = content; // Append the content
} else {
  console.error("Element with class 'travels' not found!");
}
