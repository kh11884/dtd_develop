<template>
    <div class="container">
        <h3>Телефонная книга</h3>

        <form class="mb-3">
            <div class="form-row my-1 no-gutters">
                <div class="col-12 col-sm mt-1">
                    <input id="first_name" class="form-control" type="text" v-model="newFirstName"
                           :class="{red_placeholder : isInvalidFirstName, 'border-danger': isInvalidFirstName}"
                           :placeholder="isInvalidFirstName ? 'Введите имя' : 'Имя'">
                </div>

                <div class="col-12 col-sm mt-1">
                    <input id="last_name" class="form-control" type="text" placeholder="Фамилия" v-model="newLastName"
                           :class="{red_placeholder : isInvalidLastName, 'border-danger': isInvalidLastName}"
                           :placeholder="isInvalidLastName ? 'Введите фамилию' : 'Фамилия'">
                </div>

                <div class="col-12 col-sm mt-1">
                    <input id="phone_number" class="form-control" type="number" placeholder="Номер телефона" pattern=""
                           v-model="newPhoneNumber"
                           :class="{red_placeholder : isInvalidPhoneNumber || haveNumber, 'border-danger': isInvalidPhoneNumber || haveNumber,
                       errorMessage : haveNumber}"
                           :placeholder="isInvalidPhoneNumber ? 'Введите телефон' : 'Телефон'">
                </div>

                <div class="col-12 col-sm mt-1">
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="button" @click="addContact">Добавить</button>
                </span>
                </div>
            </div>

            <span class="errorMessage" v-if="haveNumber">Такой номер телефона уже добавлен. Проверьте записи.</span>
        </form>

        <form class="form-inline mb-4">
            <label class="mr-1 mt-1">Поиск</label>
            <input class="form-control mr-1 mt-1" v-model="term">
            <button class="btn btn-primary mr-1 mt-1" type="button" @click="search">Поиск</button>
            <button class="btn btn-secondary mt-1" type="button" @click="cancelSearch">Отмена</button>
        </form>

        <div class=" min-width-860 table-responsive-sm">
            <table id="phoneBook_table" class="table table-striped table-hover">
                <thead class="table-primary">
                <tr>
                    <th class="align-middle">№</th>
                    <th class="align-middle">Имя</th>
                    <th class="align-middle">Фамилия</th>
                    <th class="align-middle text-nowrap">Номер телефона</th>
                    <th class="align-middle">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input id="root-checkbox" type="checkbox" class="form-check-input"
                                       @change="checkedAllContacts" v-model="checkAll">
                            </label>
                        </div>
                    </th>
                    <th class="align-middle text-nowrap">
                        <button type='button' title='удалить' class='btn btn-outline-danger'
                                @click="showDialogToCheckedDelete">
                            Удалить<br>выбранное
                        </button>

                    </th>
                </tr>
                </thead>
                <tbody id="phoneBook_table_body">
                <tr v-for="(contact, index) in contacts" v-bind:key="contact.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ contact.firstName }}</td>
                    <td>{{ contact.lastName }}</td>
                    <td>{{ contact.phoneNumber }}</td>
                    <td>
                        <div class='form-check'>
                            <label class='form-check-label align-middle'>
                                <input type='checkbox' class='form-check-input align-middle contact_checkbox'
                                       v-model="contact.mustBeDeleted">
                            </label>
                        </div>
                    </td>

                    <td>
                        <button type='button' title='Удалить' class='btn btn-outline-danger'
                                @click="showModal(contact)">
                            <img alt='del' src='../images/remove_icon.png' class='small_button_icon'>
                        </button>

                        <div v-if="contact.needShowModal">
                            <div class="modal-mask">
                                <div class="modal-wrapper">
                                    <div class="modal-container">

                                        <div class="modal-header">
                                            <slot name="header">
                                                Удаление элемента
                                            </slot>
                                        </div>

                                        <div class="modal-body">
                                            <slot name="body">
                                                Вы действительно хотите удалить элемент?
                                            </slot>
                                        </div>

                                        <div class="modal-footer">
                                            <slot name="footer">
                                                <button class="modal-default-button" @click="hideModal(contact)">
                                                    Отмена
                                                </button>
                                                <button class="modal-default-button" @click="deleteContact(contact)">
                                                    Да
                                                </button>
                                            </slot>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div v-if="needShowModalForDeleteChecked">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">

                            <div class="modal-header">
                                <slot name="header">
                                    Удаление выбранных элементов
                                </slot>
                            </div>

                            <div class="modal-body">
                                <slot name="body">
                                    Вы действительно хотите удалить выбранные элементы?
                                </slot>
                            </div>

                            <div class="modal-footer">
                                <slot name="footer">
                                    <button class="modal-default-button" @click="hideDialogToCheckedDelete">
                                        Отмена
                                    </button>
                                    <button class="modal-default-button" @click="deleteCheckedContacts">
                                        Да
                                    </button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PhoneBookService from "./phoneBookService";

    export default {
        data() {
            return {
                contacts: [],
                checkedContacts: [],
                newFirstName: "",
                newLastName: "",
                newPhoneNumber: "",
                term: "",
                isInvalidFirstName: false,
                isInvalidLastName: false,
                isInvalidPhoneNumber: false,
                haveNumber: false,
                needShowModalForDeleteChecked: false,
                checkAll: false
            };
        },
        created() {
            this.loadContacts();
        },
        methods: {
            addContact() {
                this.isInvalidFirstName = this.newFirstName === "";
                this.isInvalidLastName = this.newLastName === "";
                this.isInvalidPhoneNumber = this.newPhoneNumber === "";
                if (this.isInvalidFirstName || this.isInvalidLastName || this.isInvalidPhoneNumber) {
                    return;
                }

                const newPhoneNumber = this.newPhoneNumber;
                this.haveNumber = this.contacts.some(c => {
                    return c.phoneNumber === newPhoneNumber;
                });
                if (this.haveNumber) {
                    return;
                }

                const contact = {
                    firstName: this.newFirstName,
                    lastName: this.newLastName,
                    phoneNumber: this.newPhoneNumber,
                    mustBeDeleted: false,
                    needShowModal: false
                };

                PhoneBookService.addContact(contact).done(response => {
                    if (!response.success) {
                        alert(response.message);
                        return;
                    }
                    this.loadContacts();
                });

                this.newFirstName = "";
                this.newLastName = "";
                this.newPhoneNumber = "";
            },
            loadContacts() {
                this.saveMustBeDeletedIds();

                PhoneBookService.getContacts(this.term).done(contacts => {
                    this.contacts = contacts;
                    this.markSelected();
                    this.checkWasAllMarked();
                });
            },
            deleteContact(contact) {
                contact.needShowModal = false;

                PhoneBookService.deleteContact(contact).done(response => {
                    if (!response.success) {
                        alert(response.message);
                        return;
                    }
                    this.loadContacts();
                });
            },
            deleteCheckedContacts() {
                this.needShowModalForDeleteChecked = false;
                this.checkAll = false;

                this.saveMustBeDeletedIds();

                PhoneBookService.deleteCheckedContacts(this.checkedContacts).done(response => {
                    if (!response.success) {
                        alert(response.message);
                        return;
                    }
                    this.loadContacts();
                });
            },
            checkWasAllMarked() {
                if (this.contacts.length === 0) {
                    this.checkAll = false;
                } else {
                    this.checkAll = this.contacts.every(contact => {
                        return contact.mustBeDeleted === true;
                    });
                }
            },
            checkedAllContacts() {
                this.contacts.map(contact => {
                    contact.mustBeDeleted = this.checkAll;
                });
            },
            search() {
                this.loadContacts();
            },
            cancelSearch() {
                this.term = "";
                this.loadContacts();
            },
            showModal(item) {
                item.needShowModal = true;
            },
            hideModal(item) {
                item.needShowModal = false;
            },
            showDialogToCheckedDelete() {
                if (this.contacts.every(c => {
                    return c.mustBeDeleted === false;
                })) {
                    return;
                }
                this.needShowModalForDeleteChecked = true;
            },
            hideDialogToCheckedDelete() {
                this.needShowModalForDeleteChecked = false;
            },
            markSelected() {
                this.contacts.forEach(contact => {
                    contact.mustBeDeleted = this.checkedContacts.indexOf(contact.id) > -1;
                });
            },
            saveMustBeDeletedIds() {
                this.checkedContacts = this.contacts.filter(contact => {
                    return contact.mustBeDeleted;
                }).map(contact => {
                    return contact.id;
                });
            }
        }
    }
</script>

<style scoped>

</style>