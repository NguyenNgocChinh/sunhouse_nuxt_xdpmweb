<template>
    <v-card outlined class="pa-5">
        <div class="ml-5"><h3>Tìm kiếm tài sản</h3></div>
        <div class="ml-5">
            <v-text-field v-model="keyword" label="Tìm kiếm từ khóa" tìm kiếm tài sản>
                <v-icon slot="append" color="black"> mdi-magnify </v-icon>
            </v-text-field>
        </div>
        <div v-show="!banKinhOn" class="ml-5">
            <v-select v-model="inputThanhPho" :items="thanhpho" item-text="name" label="Địa điểm">
                <template #item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on" @change="getQuanHuyen(item.matp)">
                        <v-list-item-title :id="attrs['aria-labelledby']" v-text="item.name"></v-list-item-title>
                    </v-list-item>
                </template>
                <v-icon slot="append" color="black"> mdi-map-marker </v-icon>
            </v-select>
            <!--            Quan huyen-->
            <v-select v-model="inputQuanHuyen" :items="quanhuyen" item-text="name" label="Quyện Huyện">
                <template #item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on" @change="getXaPhuong(item.maqh)">
                        <v-list-item-title :id="attrs['aria-labelledby']" v-text="item.name"></v-list-item-title>
                    </v-list-item>
                </template>
                <v-icon slot="append" color="black"> mdi-map-marker </v-icon>
            </v-select>
            <!--            Phuong xa-->
            <v-select v-model="inputXaPhuong" :items="xaphuong" item-text="name" label="Xã phường">
                <template #item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on">
                        <v-list-item-title :id="attrs['aria-labelledby']" v-text="item.name"></v-list-item-title>
                    </v-list-item>
                </template>
                <v-icon slot="append" color="black"> mdi-map-marker </v-icon>
            </v-select>
        </div>
        <div class="ml-5">
            <v-switch v-model="banKinhOn" inset label="Tìm theo bán kính:"></v-switch>
        </div>
        <div v-show="banKinhOn" class="ml-5 pt-0 mt-0" @toggle="isViTri">
            <v-slider v-model="ex5.val" :label="ex5.label" :thumb-color="ex3.color" thumb-label="always"></v-slider>
            <v-radio-group v-model="radioGroup" class="pt-0 mt-0">
                <v-radio :label="'Theo địa chỉ'" :value="1" class="pt-0 mt-0"></v-radio>
                <div v-if="radioGroup == 1" class="pt-0 mt-0"><v-text-field></v-text-field></div>
                <v-radio :label="'Theo vị trí của bạn'" :value="2" class="pt-0 mt-0" onclick="radioGroup = 2"></v-radio>
            </v-radio-group>
        </div>
        <div class="ml-5">
            <v-select
                v-model="type"
                item-text="v"
                item-value="k"
                :items="[
                    { k: 'thue', v: 'Thuê' },
                    { k: 'ban', v: 'Rao Bán' },
                    { k: 'tatca', v: 'Tất Cả' },
                ]"
                label="Hình thức"
            >
                <template #item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on">
                        <v-list-item-title :id="attrs['aria-labelledby']" v-text="item.v"></v-list-item-title>
                    </v-list-item>
                </template>
            </v-select>
        </div>
        <div class="ml-5">
            <v-select v-model="loai_id" :items="loaiNha" item-value="id" item-text="ten_loai" label="Loại">
                <template #item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on">
                        <v-list-item-title
                            :id="attrs['aria-labelledby']"
                            v-text="'Loại: ' + item.ten_loai"
                        ></v-list-item-title>
                    </v-list-item>
                </template>
            </v-select>
        </div>
        <div class="ml-5">
            <v-select
                v-model="huong"
                item-text="v"
                item-value="k"
                :items="[
                    { k: 'Dong', v: 'Hướng nhà: Đông' },
                    { k: 'Tay', v: 'Hướng nhà: Tây' },
                    { k: 'Nam', v: 'Hướng nhà: Nam' },
                    { k: 'Bac', v: 'Hướng nhà: Bắc' },
                    { k: 'Dong+Bac', v: 'Hướng nhà: Đông Bắc' },
                    { k: 'Dong+Nam', v: 'Hướng nhà: Đông Nam' },
                    { k: 'Tay+Bac', v: 'Hướng nhà: Tây Bắc' },
                    { k: 'Tay+Nam', v: 'Hướng nhà: Tây Nam' },
                    { k: 'tatca', v: 'Hướng nhà: Tất Cả' },
                ]"
                label="Hướng nhà"
            >
                <template #item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on">
                        <v-list-item-title :id="attrs['aria-labelledby']" v-text="item.v"></v-list-item-title>
                    </v-list-item>
                </template>
            </v-select>
        </div>
        <div class="ml-5">
            <v-select
                v-model="sophongngu"
                item-text="v"
                item-value="k"
                :items="[
                    { k: '1', v: 'Số phòng ngủ: 1+' },
                    { k: '2', v: 'Số phòng ngủ: 2+' },
                    { k: '3', v: 'Số phòng ngủ: 3+' },
                    { k: '4', v: 'Số phòng ngủ: 4+' },
                    { k: '5', v: 'Số phòng ngủ: 5+' },
                    { k: 'tatca', v: 'Tất Cả' },
                ]"
                label="Số phòng ngủ"
            >
                <template #item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on">
                        <v-list-item-title :id="attrs['aria-labelledby']" v-text="item.v"></v-list-item-title>
                    </v-list-item>
                </template>
            </v-select>
        </div>
        <div class="ml-5">
            <v-select
                v-model="sophongtam"
                item-value="k"
                item-text="v"
                :items="[
                    { k: '1', v: 'Số phòng tắm: 1+' },
                    { k: '2', v: 'Số phòng tắm: 2+' },
                    { k: '3', v: 'Số phòng tắm: 3+' },
                    { k: '4', v: 'Số phòng tắm: 4+' },
                    { k: '5', v: 'Số phòng tắm: 5+' },
                    { k: 'tatca', v: 'Tất Cả' },
                ]"
                label="Số phòng tắm"
            >
                <template #item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on">
                        <v-list-item-title :id="attrs['aria-labelledby']" v-text="item.v"></v-list-item-title>
                    </v-list-item>
                </template>
            </v-select>
        </div>
        <div class="ml-1">
            <v-card flat color="transparent">
                <v-card-text>
                    <v-row>
                        <v-col class="px-4">
                            <v-range-slider
                                v-model="rangeGia"
                                :max="maxGia"
                                :min="minGia"
                                hide-details
                                :label="ex3.label"
                                :thumb-color="ex3.color"
                                thumb-label="always"
                                class="align-center"
                            >
                            </v-range-slider>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
        <div class="ml-1">
            <v-card flat color="transparent">
                <v-card-text>
                    <v-row>
                        <v-col class="px-4">
                            <v-range-slider
                                v-model="rangeDienTich"
                                :max="maxDienTich"
                                :min="minDienTich"
                                hide-details
                                :label="ex4.label"
                                :thumb-color="ex3.color"
                                thumb-label="always"
                                class="align-center"
                            >
                            </v-range-slider>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
        <div class="ml-1">
            <v-btn block class="deep-orange lighten-1" @click="getTimKiemBaiDang()">Tìm kiếm</v-btn>
        </div>
    </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            loaiNha: [],
            minGia: 0,
            maxGia: 0,
            minDienTich: 0,
            maxDienTich: 0,
            rangeGia: [0, 0],
            rangeDienTich: [0, 0],
            ex1: { label: 'color', val: 50, color: 'purple darken-1' },
            ex2: { label: 'track-color', val: 75, color: 'green lighten-1' },
            ex3: { label: 'Giá từ', val: 50, color: 'blue lighten-1' },
            ex4: { label: 'Diện tích từ', val: 50, color: 'red' },
            ex5: { label: '', val: 50, color: 'red' },
            banKinhOn: false,
            isViTri: true,
            radioGroup: 1,
            keyword: null,
            inputThanhPho: '',
            inputQuanHuyen: '',
            inputXaPhuong: '',
            type: null,
            loai_id: null,
            huong: null,
            sophongngu: 0,
            sophongtam: 0,
            thanhpho: [],
            quanhuyen: [],
            xaphuong: [],
            X: '',
            Y: '',
            inputAdressR: '',
            bankinh: null,
        }
    },

    created() {
        this.getAllLoai()
        this.getGiaMinMax()
        this.getDienTich()
        this.getThanhPho()
        this.getTimKiemBaiDang()
    },
    methods: {
        ...mapState({
            kqTimKiem: (state) => state.SearchResult,
        }),
        // SELECT Theo vi tri
        async getAllLoai() {
            try {
                const loai = await this.$axios.$get('https://api.sunhouse.stuesports.info/api/loai')
                this.loaiNha = loai
            } catch (e) {
                console.log(e)
            }
        },
        getGiaMinMax() {
            try {
                this.$axios.$get('https://api.sunhouse.stuesports.info/api/gia').then((data) => {
                    this.rangeGia = [data.min, data.max]
                    this.minGia = data.min
                    this.maxGia = data.max
                })
            } catch (e) {
                console.log(e)
            }
        },
        getDienTich() {
            try {
                this.$axios.$get('https://api.sunhouse.stuesports.info/api/dientich').then((data) => {
                    this.rangeDienTich = [data.min, data.max]
                    this.minDienTich = data.min
                    this.maxDienTich = data.max
                })
            } catch (e) {
                console.log(e)
            }
        },
        async getThanhPho() {
            try {
                const thanhPhoArr = await this.$axios.$get('https://api.sunhouse.stuesports.info/api/ThanhPho')
                this.thanhpho = thanhPhoArr
            } catch (e) {
                console.log(e)
            }
        },

        async getQuanHuyen(id) {
            const quanhuyen = await this.$axios.$get(`https://api.sunhouse.stuesports.info/api/QuanHuyen/${id}`)
            this.quanhuyen = quanhuyen
        },

        async getXaPhuong(id) {
            const xaphuong = await this.$axios.$get(`https://api.sunhouse.stuesports.info/api/XaPhuong/${id}`)
            this.xaphuong = xaphuong
        },

        checkType() {
            let kq = null
            if (this.type === 'Thuê') {
                kq = 'thue'
            } else if (this.type === 'Tất Cả') {
                kq = 'tatca'
            }
            return kq
        },

        getTimKiemBaiDang() {
            // this.$store.state.SearchResult = null
            this.$axios
                .$get('https://api.sunhouse.stuesports.info/api/timkiem', {
                    params: {
                        // diadiem: this.inputThanhPho,
                        gia1: this.rangeGia[0],
                        gia2: this.rangeGia[1],
                        type: this.type,
                        loai_id: this.loai_id,
                        huong: this.huong,
                        sophongngu: this.sophongngu,
                        sophongtam: this.sophongtam,
                        keyword: this.keyword,
                        dientich1: this.rangeDienTich[0],
                        dientich2: this.rangeDienTich[1],
                        // X: this.X,
                        // Y: this.Y,
                        // inputAdressR: this.inputAdressR,
                        bankinh: this.ex5.val,
                    },
                })
                .then((kqTimKiem) => {
                    this.$store.state.SearchResult = kqTimKiem
                    this.$store.state.loadingSearchResult = true

                    this.$store.commit('SET_KQ_BAIDANG_TIMKIEM', kqTimKiem)
                    console.log('KHO ', kqTimKiem)
                })
        },
    },
}
</script>
