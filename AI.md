# AI & Mantık Dokümantasyonu — The Last Piece Standing

Bu belge, projede uygulanan algoritmaların teknik bir açıklamasını içermektedir.

## 1. Hareket Doğrulama (Move Validation)

Taş hareketleri mantığı `isValid()` fonksiyonu ile gerçekleştirilmiştir. Fonksiyon şu kontrolleri yapar:

- **Knight (At):** Mutlak koordinat farkı hesaplanarak uygulanır ($|dx|=1, |dy|=2$ veya tam tersi).
- **Bishop (Fil):** Koordinat farklarının mutlak değerlerinin eşitliği kontrol edilerek çapraz hareket sağlanır ($|dx| = |dy|$).
- **Rook (Kale):** Eksenel hareket kontrolü yapılır ($dx=0$ veya $dy=0$).

## 2. Düşman Yapay Zekası (Enemy AI)

Düşmanlar öncelikli hedefler prensibine göre çalışır:

1. **Oyuncu Yakalama:** Düşman her turda olası hamlelerini kontrol eder. Eğer oyuncunun koordinatı olası hamlelerden biriyle çakışıyorsa, düşman saldırı yapar.
2. **İlerleme:** Eğer saldırı mümkün değilse, algoritma düşmanı oyun tahtasının altına (`y = 5`) en çok yaklaştıran hamleyi seçer.
3. **Çakışma Önleme:** `nextTaken` dizisinin kullanımı, düşmanların aynı hücrede bulunmasını engeller.

## 3. Görsel Efektler (Particles)

Zafer animasyonu için parçacık sistemi (`particles`) kullanılır. Her parçacığın yaşam süresi (`life`), hız vektörleri ve yerçekimi parametreleri vardır; bu, harici bir kütüphane olmadan Canvas üzerinde dinamik bir havai fişek efekti oluşturur.
