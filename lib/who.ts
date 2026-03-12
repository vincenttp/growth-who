export interface LMS {
  L: number
  M: number
  S: number
}

export function zScore(value: number, { L, M, S }: LMS) {

  if (L === 0) {
    return Math.log(value / M) / S
  }

  return (Math.pow(value / M, L) - 1) / (L * S)
}

export function valueFromZScore(z: number, { L, M, S }: LMS) {
  if (L === 0) {
    return M * Math.exp(z * S);
  }
  // y = M * (1 + L * S * Z)^(1/L)
  return M * Math.pow(1 + L * S * z, 1 / L);
}

export interface STATUS {
  status: string,
  color: string,
  recommendation: string
}

// Berat Badan menurut Umur (BB/U)
export function statusBBU(z: number): STATUS {
  if (z < -3) return { status: "Berat Badan Sangat Kurang", color: "text-red-600", recommendation: "Segera konsultasikan dengan dokter anak untuk pemeriksaan mendalam. Anak mungkin membutuhkan intervensi gizi khusus." }; // Severely Underweight
  if (z < -2) return { status: "Berat Badan Kurang", color: "text-yellow-600", recommendation: "Perbaiki pola makan dengan gizi seimbang dan pantau berat badan secara rutin. Konsultasikan ke Posyandu atau Puskesmas." };     // Underweight
  if (z <= 1) return { status: "Berat Badan Normal", color: "text-green-600", recommendation: "Pertahankan pola makan sehat dan gizi seimbang. Lanjutkan pemantauan pertumbuhan secara berkala." };      // Normal
  return { status: "Risiko Berat Badan Lebih", color: "text-orange-600", recommendation: "Evaluasi asupan kalori dan aktivitas fisik anak. Hindari makanan tinggi gula/lemak berlebih." };           // Risk of Overweight
}

// Tinggi Badan atau Panjang Badan menurut Umur (TB/U atau PB/U)
export function statusTBU(z: number): STATUS {
  if (z < -3) return { status: "Sangat Pendek", color: "text-red-600", recommendation: "Segera hubungi dokter spesialis anak. Diperlukan evaluasi untuk stunting kronis dan intervensi gizi segera." };  // Severely Stunted
  if (z < -2) return { status: "Pendek", color: "text-yellow-600", recommendation: "Tingkatkan asupan protein hewani, kalsium, dan zinc. Periksakan ke layanan kesehatan untuk mencegah stunting." };      // Stunted
  if (z <= 3) return { status: "Normal", color: "text-green-600", recommendation: "Pertumbuhan tinggi badan optimal. Pastikan asupan nutrisi dan istirahat yang cukup." };       // Normal
  return { status: "Tinggi", color: "text-blue-600", recommendation: "Tinggi badan di atas rata-rata. Ini biasanya baik, namun jika berlebihan konsultasikan untuk memastikan keseimbangan hormon." };                    // Tall
}

// Berat Badan menurut Tinggi Badan atau Panjang Badan (BB/TB atau BB/PB)
export function statusBBTB(z: number): STATUS {
  if (z < -3) return { status: "Gizi Buruk", color: "text-red-600", recommendation: "Kondisi gawat darurat. Segera bawa anak ke Rumah Sakit atau dokter anak untuk penanganan medis segera." };          // Severely Wasted
  if (z < -2) return { status: "Gizi Kurang", color: "text-yellow-600", recommendation: "Waspada wasting (kurus). Berikan makanan padat energi dan protein. Konsultasikan ke ahli gizi." };      // Wasted
  if (z <= 1) return { status: "Gizi Baik (Normal)", color: "text-green-600", recommendation: "Proporsi berat dan tinggi badan ideal. Pertahankan pola asuh dan makan yang baik." };// Normal
  if (z <= 2) return { status: "Berisiko Gizi Lebih", color: "text-orange-500", recommendation: "Mulai atur porsi makan. Kurangi camilan manis/gorengan. Ajak anak lebih aktif bergerak." };// Risk of Overweight
  if (z <= 3) return { status: "Gizi Lebih", color: "text-orange-600", recommendation: "Konsultasikan dengan dokter untuk program manajemen berat badan yang sehat tanpa menghambat pertumbuhan tinggi." };       // Overweight
  return { status: "Obesitas", color: "text-red-600", recommendation: "Perlu penanganan medis serius untuk mencegah komplikasi kesehatan. Segera ke dokter anak/ahli gizi." };                        // Obese
}