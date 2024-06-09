const openModalButtonRef = document.querySelector('.quick-action .icon.add');
const closeModalButtonRef = document.querySelector('.modal .right-section .icon.close');
const modalRef = document.querySelector('.modal');
const textAreaRef = document.querySelector('.modal .left-section textarea');
const priorityButtonsRef = document.querySelectorAll('.modal .right-section .priority-filter .box');

const tasks = [];

const newTask = {
    id: '',
    description: '',
    priority: '',
    completed: false,
}

openModalButtonRef.addEventListener('click', () => {
    if (isHideClassExist()) {
        openModal();
    } else {
        closeModal();
    }
});

closeModalButtonRef.addEventListener('click', () => {
    modalRef.classList.add('hide');
});

function isHideClassExist() {
    return modalRef.classList.contains('hide');
}

function closeModal() {
    textAreaRef.value = '';
    setDefaultPriority();
    modalRef.classList.add('hide');
}

function openModal() {
    modalRef.classList.remove('hide');
}

textAreaRef.addEventListener('keyup', (event) => {
    if (event.key == 'Shift') {
        const description = textAreaRef.value;
        const priority = getPriority();
        console.log(
            description,
            priority
        )
        const task = { ...newTask };
        task.id = tasks.length + 1;
        task.description = description;
        task.priority = priority;
        tasks.push(task);

        closeModal();
        console.log(tasks);
    }
});

function removeSelectedClass() {
    priorityButtonsRef.forEach((button) => {
        button.classList.remove('selected');
    })
}

function getPriority() {
    let pri = '';
    priorityButtonsRef.forEach((button, index) => {
        if (button.classList.contains('selected')) {
            pri = `p${index + 1}`;
        }
    });
    return pri;
}

function setDefaultPriority() {
    removeSelectedClass();
    priorityButtonsRef[3].classList.add('selected');
}

priorityButtonsRef.forEach((button) => {
    button.addEventListener('click', () => {
        removeSelectedClass();
        button.classList.add('selected');
    })
})