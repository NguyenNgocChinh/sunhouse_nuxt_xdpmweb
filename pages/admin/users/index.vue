<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Quản Lý User
                <v-spacer />
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                v-model="selected"
                :search="search"
                :loading="loading"
                :sort-by="['id']"
                :sort-desc="[true]"
                :headers="headers"
                :items="dsBaiDang"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
            >
                <template #top>
                    <div class="d-flex justify-space-between">
                        <v-switch v-model="singleSelect" label="Tắt chọn tất cả" class="pa-3"></v-switch>
                        <v-spacer />
                        <div class="pt-4">
                            <v-btn fab dark small color="green" class="mr-2">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn fab dark small color="indigo" class="mr-2">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <v-btn fab dark small color="red" class="mr-5">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </template>

                <template #[`item.choduyet`]="{ item }">
                    <v-btn v-if="item == 1" icon color="teal">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>

                    <v-btn v-else icon color="red">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>

                <template #[`item.hanhdong`]="{ item }">
                    <v-icon color="blue" class="mr-2" @click="showItem(item)"> mdi-eye </v-icon>
                    <v-icon color="orange" class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
                    <v-dialog transition="dialog-top-transition" max-width="600">
                        <template #activator="{ on, attrs }">
                            <v-icon color="red" v-bind="attrs" v-on="on"> mdi-delete </v-icon>
                        </template>
                        <template #default="dialog">
                            <v-card>
                                <v-toolbar class="red lighten-1" dark>XÁC NHẬN XÓA</v-toolbar>
                                <v-card-text class="pa-0">
                                    <div class="font-weight-black pa-5">
                                        Bạn có chắc chắn muốn xóa user có ID : {{ item.id }} ?
                                    </div>
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-btn text @click="dialog.value = false">Hủy</v-btn>
                                    <v-btn color="red" class="white--text" @click="deleteItem(item.id)">XÓA</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
export default {
    components: {},
    layout: 'admin',
    data() {
        return {
            search: '',
            singleSelect: false,
            selected: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Username', value: 'username' },
                { text: 'Email', value: 'email' },
                { text: 'Vai Trò', value: 'vaitro' },
                { text: 'Đã duyệt', value: 'choduyet' },
                { text: 'Hành động', value: 'hanhdong', sortable: false },
            ],
            dsBaiDang: [],
            loading: true,
            fab: false,
        }
    },
    created() {
        this.fetchDSBaiDang()
    },
    methods: {
        async fetchDSBaiDang() {
            const data = await this.$axios.$get('https://api.sunhouse.stuesports.info/api/users')
            this.dsBaiDang = data
            this.loading = false
        },
        showItem: (item) => console.log('SHOW FUCTION'),
        editItem: (item) => console.log('EDIT FUNCTION'),
        deleteItem: (item) => console.log('DELETE FUNCTION'),
    },
}
</script>
