$(document).ready(function () {
    let isPlaying = false;
    let currentSongIndex = 0;
    let isRepeat = false;
    let isShuffle = false;

    const songs = [
        { audio: '/music/2023/Yoru ni Kakeru - Ayase, YOASOBI.mp3', title: 'Yoru ni Kakeru', image: 'images/yoru_ni_kakeru.jpg' },
        { audio: '/music/2023/Shukufuku  - Ayase, YOASOBI.mp3', title: 'Shukufuku', image: 'images/Shukufuku.jpg' },
        { audio: '/music/2023/Sangenshoku - Ayase, YOASOBI.mp3', title: 'Sangenshoku', image: 'images/Sangenshoku.jpg' },
        { audio: '/music/2023/Biri-Biri - Ayase, YOASOBI.mp3', title: 'Biri-Biri', image: 'images/Biri_Biri.jpg' },
        { audio: '/music/2023/Yuusha - Ayase, YOASOBI.mp3', title: 'Yuusha', image: 'images/Yuusha.jpg' },
        { audio: '/music/2023/Tabun - Ayase, YOASOBI.mp3', title: 'Tabun', image: 'images/Tabun.jpg' },
        { audio: '/music/2023/Gunjou - Ayase, YOASOBI.mp3', title: 'Gunjou', image: 'images/Gunjou.jpg' },
        { audio: '/music/2023/Idol - Ayase, YOASOBI.mp3', title: 'Idol', image: 'images/Idol.jpg' },
        { audio: '/music/2024/HEART BEAT - Ayase, YOASOBI.mp3', title: 'HEART BEAT', image: 'images/HEART_BEAT.jpg' }
    ];

    loadAudio(songs[currentSongIndex].audio, songs[currentSongIndex].title, songs[currentSongIndex].image);

    $('.songList li').click(function () {
        currentSongIndex = $(this).index();
        loadAndPlayCurrentSong();
    });

    $('#audioPlayer').on('ended', function() {
        if (isRepeat) {
            playAudio(); // If repeat is on, replay the current song
        } else {
            playNext(); // Otherwise, play the next song
        }
    });

    $('#playPauseBtn').on('click', function () {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    $('#stopBtn').on('click', stopAudio);

    $('#nextBtn').on('click', function () {
        playNext();
    });

    $('#prevBtn').on('click', function () {
        playPrevious();
    });

    $('#repeatBtn').on('click', function () {
        toggleRepeat();
    });

    $('#shuffleBtn').on('click', function () {
        toggleShuffle();
    });

    function playNext() {
        if (isShuffle) {
            currentSongIndex = getRandomIndex();
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        loadAndPlayCurrentSong();
    }

    function playPrevious() {
        if (isShuffle) {
            currentSongIndex = getRandomIndex();
        } else {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        }
        loadAndPlayCurrentSong();
    }

    function toggleRepeat() {
        if (!isShuffle) { // only allow repeat if shuffle is not active
            isRepeat = !isRepeat;
            if (isRepeat) {
                $('#repeatBtn').css('color', 'red');
            } else {
                $('#repeatBtn').css('color', 'black');
            }
        }
    }

    function toggleShuffle() {
        if (!isRepeat) { // only allow shuffle if repeat is not active
            isShuffle = !isShuffle;
            if (isShuffle) {
                $('#shuffleBtn').css('color', 'red');
            } else {
                $('#shuffleBtn').css('color', 'black');
            }
        }
    }

    function getRandomIndex() {
        return Math.floor(Math.random() * songs.length);
    }

    function loadAndPlayCurrentSong() {
        loadAudio(songs[currentSongIndex].audio, songs[currentSongIndex].title, songs[currentSongIndex].image);
        playAudio();
    }

    function loadAudio(audioPath, title, imagePath) {
        $('#audioPlayer').attr('src', audioPath);
        $('#trackTitle').text(title);
        $('#trackImage').attr('src', imagePath);
    }

    function playAudio() {
        $('#audioPlayer')[0].play();
        isPlaying = true;
    }

    function pauseAudio() {
        $('#audioPlayer')[0].pause();
        isPlaying = false;
    }

    function stopAudio() {
        $('#audioPlayer')[0].pause();
        $('#audioPlayer')[0].currentTime = 0;
        isPlaying = false;
    }
});
