<template>
    <q-card square style="max-width: 350px" class="text-dark text-center q-mx-auto text-body">
        <q-card-section>
            <div class="text-h2 font-calculator">
                {{ displayTime }}
            </div>
        </q-card-section>
        <q-card-actions align="around" class="q-pa-none">
            <q-btn round size="lg" flat :disable="displayTime == '00:00' && timer == null"
                :icon="timer == null ? 'play_arrow' : 'stop'" @click="toggleTimer"></q-btn>
            <q-btn round size="lg" flat icon="replay" @click="resetTimer"></q-btn>
        </q-card-actions>
        <q-card-actions align="around" class="font-calculator">
            <q-btn round flat size icon="remove" @click="addTime(-30, true)" />
            <q-btn round flat size="lg" @click="addTime(60, false)">1</q-btn>
            <q-btn round flat size="lg" @click="addTime(180, false)">3</q-btn>
            <q-btn round flat size="lg" @click="addTime(300, false)">5</q-btn>
            <q-btn round flat icon="add" @click="addTime(30, true)" />
        </q-card-actions>
    </q-card>
</template>

<script setup>
import alarm from "~/assets/audio/alarm_sound.mp3";
const props = defineProps({
    step: Number
});

const originTime = ref(0);
const currentTime = ref(0);
const timer = ref(null);
const audioPlayer = ref(null);

watch(() => props.step, (o, n) => {
    clearInterval(timer.value);
    timer.value = null;
    let time = o && o.match(/\d+/);
    originTime.value = time ? parseInt(time[0]) * 60 : 0;
    time ? (currentTime.value = parseInt(time[0]) * 60) : 0;
    currentTime.value = time ? parseInt(time[0]) * 60 : 0;
})

const displayTime = computed(() => {
    let minutes = Math.floor(currentTime.value / 60);
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = currentTime.value % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
})

const addTime = (seconds, add) => {
    if (timer.value != null) {
        currentTime.value += seconds;
    } else {
        if (add) {
            originTime.value += seconds;
            currentTime.value += seconds;
        } else {
            originTime.value = seconds;
            currentTime.value = seconds;
        }
    }
}

const resetTimer = () => {
    clearInterval(timer.value);
    timer.value = null;
    currentTime.value = originTime.value;
}

const toggleTimer = () => {
    if (timer.value != null && audioPlayer.value != null) {
        clearInterval(timer.value);
        timer.value = null;
        audioPlayer.value.pause();
        audioPlayer.value = null;
    } else if (timer.value != null) {
        clearInterval(timer.value);
        timer.value = null;
    } else {
        timer.value = setInterval(() => {
            currentTime.value -= 1;
            if (currentTime.value == 0) {
                clearInterval(timer.value);
                audioPlayer.value = new Audio(alarm);
                audioPlayer.value.loop = true;
                audioPlayer.value.play()
            }
        }, 1000);
    }
}



</script>

<style lang="scss" scoped></style>