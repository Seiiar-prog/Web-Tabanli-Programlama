# The Last Piece Standing

**Ders Projesi / Laboratuvar Çalışması (BTÜ)**
Bu proje, Vanilla JavaScript kullanılarak geliştirilmiş, satranç mekaniklerine dayalı stratejik bir oyundur.

## Proje Özellikleri

- **Dinamik Yetenekler:** Oyuncu, oyun sırasında At, Fil ve Kale rolleri arasında geçiş yapabilir.
- **Seviye Sistemi:** Piyonlar, Atlar ve Filler gibi farklı taş türleriyle artan zorluk seviyeleri (4 seviye) uygulanmıştır.
- **Duyarlı Arayüz (UI):** Yetenek paneli, olay günlükleri (logs) ve puan sayacı içerir.
- **Yeniden Başlatma Özelliği:** Mevcut maçı genel ilerlemeyi kaybetmeden anında yeniden başlatma imkanı.

## Kullanılan Teknolojiler

- **HTML5 Canvas:** Oyun tahtası ve animasyonların işlenmesi.
- **CSS3:** Arayüz ve yetenek kartlarının tasarımı.
- **JavaScript (ES6):** Tüm oyun mantığı ve durum yönetimi.

## Nasıl Çalıştırılır?

1. Depoyu klonlayın.
2. `index.html` dosyasını herhangi bir modern tarayıcıda açın.
3. Oyunu başlatmak için **START / UNMUTE** düğmesine tıklayın.

## Kontroller

- **Kareye Tıklama:** Hamle yapın (geçerli hamleler altın noktalarla işaretlenir).
- **Karta Tıklama:** Mevcut taşı değiştirin (Knight/Bishop/Rook).
- **Restart Düğmesi:** Mevcut seviyedeki taşların konumlarını sıfırlayın.
