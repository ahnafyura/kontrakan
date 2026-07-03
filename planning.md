# Rencana: Dashboard Monitoring Listrik Kontrakan (5 Kamar, 2700VA)

## Context

Kontrakan memiliki 5 kamar (2 master bedroom ber-AC, 3 tanpa AC), daya listrik rumah 2700VA pascabayar, dihuni 5 orang dengan total ~6 HP, 5 laptop, 1 monitor, 4 iPad. Tujuannya adalah membangun sistem monitoring konsumsi listrik **per kamar** (termasuk AC dan WiFi) agar pemilik bisa:
1. Mendapat estimasi biaya listrik spesifik per bulan berbasis data real, bukan asumsi.
2. Berpotensi membagi biaya listrik ke penghuni secara adil dan transparan berdasarkan pemakaian aktual, bukan rata pukul.
3. Memantau agar total pemakaian tidak melebihi kapasitas 2700W saat beban puncak (semua AC + charger + WiFi menyala bersamaan).

Kondisi saat ini: jalur listrik dari meteran ke tiap kamar **belum dipisah per-MCB** (masih satu jalur bersama), tapi tiap kamar sudah punya stop kontak yang menyala/berfungsi. Instalasi listrik khusus untuk WiFi (router) belum ada. Meteran PLN bersifat **pascabayar**. Pendekatan sensor yang dipilih: **smart plug per perangkat/titik**, bukan CT-clamp di panel (karena jalur belum terpisah per kamar, opsi CT-clamp per-MCB tidak feasible tanpa kerja instalasi ulang).

## 1. Survei Fisik Wajib (sebelum belanja alat) — checklist detail

Ini krusial supaya tidak ada beban yang "kelewatan" dan menyebabkan selisih antara total dashboard vs tagihan PLN asli:

- **Per kamar**: hitung jumlah stop kontak/outlet fisik yang aktif (bukan cuma yang "menyala", tapi berapa titik colokan berbeda). Kalau 1 kamar punya 2+ outlet terpisah (bukan dari 1 power strip), butuh smart plug lebih dari 1 per kamar.
- **Spesifikasi AC** di 2 master bedroom: PK (0.5/1/1.5/2 PK), watt nominal di label unit, inverter atau non-inverter (inverter = arus start lebih rendah tapi tetap perlu smart plug rating cukup).
- **Beban bersama** — untuk tiap item ini, cek apakah dicolok ke stop kontak (bisa pasang smart plug) atau hardwired langsung ke kabel/saklar (butuh smart relay inline, bukan smart plug):
  - Pompa air (sering hardwired ke saklar, bukan dicolok — cek dulu)
  - Kulkas bersama (biasanya dicolok, mudah)
  - Lampu teras/koridor (sering hardwired ke saklar dinding)
  - Dispenser (biasanya dicolok)
- **ID Pelanggan & golongan tarif PLN** — cek dari struk tagihan atau aplikasi PLN Mobile untuk dapat angka Rp/kWh yang PASTI (2700VA kemungkinan golongan R1M atau langganan khusus, bukan tarif standar 900VA/1300VA), termasuk komponen biaya admin/meterai bulanan yang perlu dialokasikan terpisah dari kWh murni.
- **Ketersediaan WiFi existing** — smart plug WiFi butuh jaringan WiFi stabil untuk lapor data. Karena instalasi listrik untuk WiFi belum ada, ini jadi **prasyarat Phase 0**: pastikan router punya sumber listrik tetap dan sinyal menjangkau 5 kamar (kalau rumah cukup luas/bertingkat, pertimbangkan mesh AP tambahan) sebelum smart plug lain dipasang.
- **Alokasi penghuni ke kamar** — konfirmasi 5 orang benar-benar 1 orang/kamar atau ada kamar berbagi, karena ini mempengaruhi validasi wajar-tidaknya konsumsi tiap kamar.

## 2. Daftar Hardware (Shopping List) — harga pasar Indonesia, Juli 2026

### Tier 1 — Beli sekarang (prioritas tertinggi, ROI paling besar)

| Item | Qty | Rekomendasi produk | Harga satuan | Subtotal |
|---|---|---|---|---|
| Smart plug AC (rating tinggi) | 2 | Sonoff S60 WiFi Power Monitoring (varian **≥16A**) | Rp250.000–340.000 | ~Rp600.000 |
| Smart plug outlet kamar | 5 | Bardi Smart Plug WiFi (ada monitor daya) | Rp150.000–220.000 | ~Rp900.000 |
| Smart plug kulkas + dispenser | 2 | Bardi/Sonoff S60 sama seperti di atas | Rp150.000–220.000 | ~Rp360.000 |

**Subtotal Tier 1: ~Rp1.860.000**

⚠️ Banyak smart plug murah (Rp69.900–80.000, generic Tuya) **tidak punya fitur pengukuran watt** — cuma on/off jarak jauh. Pastikan judul produk eksplisit menyebut "power monitoring"/"energy monitoring"/"monitor daya".

### Tier 2 — Setelah survei fisik (tergantung pompa air/lampu koridor hardwired atau tidak)

| Item | Qty | Rekomendasi produk | Harga satuan | Subtotal |
|---|---|---|---|---|
| Smart relay inline (jika hardwired) | 2 (pompa air + lampu koridor) | Sonoff POW R3 Elite 16A/20A (built-in power meter, ESP32) | Rp338.000–450.000 | ~Rp700.000–900.000 |
| Smart plug router WiFi (opsional) | 1 | Bardi/Tuya plug termurah, tak perlu monitoring detail | Rp70.000–130.000 | ~Rp100.000 |

Sonoff POW R3 disambung ke kabel (bukan dicolok) — kalau pompa air/lampu koridor memang hardwired, pemasangan perlu bantuan tukang listrik.

### Tier 3 — Opsional, bisa ditunda (hub untuk dashboard custom)

| Item | Catatan |
|---|---|
| Raspberry Pi 4 (4GB) + PSU + SD card + case, self-host Home Assistant | ~Rp1.200.000–1.800.000. Harga Raspberry Pi sedang naik akibat krisis harga RAM global 2026. Alternatif hemat: pakai laptop/PC bekas sbg server Home Assistant (Docker), atau mulai dulu tanpa hub — pakai app bawaan vendor (eWeLink untuk Sonoff, app Bardi) yang sudah punya grafik & histori per device, upgrade ke Home Assistant nanti kalau butuh agregasi custom per kamar + kalkulasi Rupiah otomatis. |

### Ringkasan Total

- **Minimum (Tier 1 saja)**: ~Rp1.860.000
- **Lengkap (Tier 1+2)**: ~Rp2.660.000–2.860.000
- **Full dengan dashboard custom (+Tier 3)**: ~Rp3.860.000–4.660.000

Estimasi total titik monitoring: ±10-13 smart plug/relay (2 AC + 5 outlet kamar + router + kulkas + dispenser + pompa air/lampu), tergantung hasil survei jumlah outlet per kamar.

## 3. Arsitektur Software

- **Hub**: Home Assistant (self-hosted, gratis, open-source) sebagai pusat pengumpul data dari semua smart plug (mendukung integrasi Tuya Local, ESPHome, eWeLink/Sonoff, dll — pilih brand smart plug yang punya integrasi resmi/lokal di Home Assistant supaya data tidak "terkunci" di app vendor).
- **Dashboard bawaan**: Home Assistant Energy Dashboard sudah bisa breakdown per-device/per-area (kamar) secara otomatis dari data smart plug — titik awal paling cepat tanpa coding tambahan.
- **Dashboard kustom (opsional)**: kalau butuh tampilan khusus untuk ditunjukkan ke penghuni (mis. breakdown biaya per kamar, bukan cuma watt), bangun web app (React/Node) yang fetch data lewat Home Assistant REST/WebSocket API.
- **Perhitungan Rupiah**: buat `utility_meter` + template sensor di Home Assistant per kamar → konversi kWh bulanan ke Rupiah pakai tarif Rp/kWh aktual dari tagihan PLN (bukan asumsi), plus alokasi proporsional biaya beban bersama (pompa air+kulkas+lampu+wifi) dibagi ke 5 kamar sesuai kesepakatan (rata atau proporsional watt).
- **Alert**: automasi notifikasi kalau total beban real-time mendekati 2700W (mis. >2400W = warning), atau kalau AC menyala terus-menerus di luar wajar.

## 4. Formula Estimasi Biaya Bulanan

```
Biaya per kamar = (kWh terukur smart plug kamar tsb, 1 bulan) × tarif Rp/kWh aktual
Biaya beban bersama = Σ(kWh pompa air + kulkas + lampu koridor + WiFi) × tarif Rp/kWh
Alokasi beban bersama per kamar = Biaya beban bersama ÷ 5 (atau proporsional sesuai kesepakatan)
Total per kamar = Biaya per kamar + Alokasi beban bersama per kamar
Total seluruh rumah = Σ semua kamar + biaya admin/meterai tetap PLN
```
Total seluruh rumah harus divalidasi mendekati (toleransi <5%) angka tagihan PLN asli bulan tersebut — dipakai sebagai kalibrasi akurasi sensor.

## 5. Tahapan Implementasi (Rollout)

1. **Phase 0 — Prasyarat**: Survei fisik lengkap (Bagian 1) + pastikan WiFi router aktif & jangkauan cukup ke 5 kamar (prasyarat mutlak sebelum smart plug lain bisa dipasang, karena semua berbasis WiFi).
2. **Phase 1 — Beban terbesar dulu**: Pasang smart plug di 2 unit AC (beban paling signifikan & termahal, ROI monitoring paling tinggi).
3. **Phase 2 — Kamar non-AC + beban bersama**: Pasang smart plug di 3 kamar non-AC + pompa air/kulkas/dispenser/lampu koridor.
4. **Phase 3 — Setup Hub**: Install Home Assistant, integrasikan semua smart plug, verifikasi tiap titik melaporkan watt/kWh dengan benar.
5. **Phase 4 — Kalkulasi & Dashboard**: Setup utility_meter + template sensor Rupiah per kamar, susun dashboard (bawaan atau kustom).
6. **Phase 5 — Validasi 1 bulan penuh**: Bandingkan total kWh dashboard vs angka fisik meteran PLN (catat stand awal & akhir bulan), kalibrasi kalau ada selisih signifikan.

## Verifikasi

- Setelah Phase 3, cek tiap smart plug melaporkan watt real-time yang masuk akal (mis. AC nyala → naik ke ~700-900W, bukan 0 atau nilai aneh).
- Setelah 1 bulan penuh berjalan (Phase 5), bandingkan: `Σ kWh semua titik monitoring` vs `kWh dari catatan meteran PLN fisik (stand akhir - stand awal)`. Selisih >5% menandakan ada beban yang belum termonitor (kemungkinan besar dari titik hardwired yang terlewat saat survei) — kembali ke checklist Bagian 1 untuk cari beban yang belum ke-cover.
- Cross-check estimasi Rupiah dashboard vs nominal tagihan PLN aktual bulan berjalan.
