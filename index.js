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
        listTasks(tasks);
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

function createTicket(task) {
    return `
    <div class="ticket-container" id="${task.id}">
        <div class="ticket-priority ${task.priority}"></div>
        <div class="ticket-id">${task.id}</div>
        <div class="ticket-content">
            <textarea class="ticket-content-textarea" disabled = true>${task.description}</textarea>
        </div>
        <div class="ticket-lock locked">
            <i class="icon fa-solid fa-lock"></i>
            <i class="icon fa-solid fa-lock-open"></i>
        </div>
    </div>
    `
}

function listTasks(tasks) {
    document.querySelector('.ticket-section').replaceChildren();
    tasks.forEach(task => {
        const ticket = createTicket(task);
        document.querySelector('.ticket-section').insertAdjacentHTML('beforeend', ticket);
        addListners(task.id);
    })
}
function addListners(id) {
    const ticket = document.getElementById(`${id}`);
    ticket.querySelector('.ticket-lock').addEventListener('click', (event) => {
        const textarea = ticket.querySelector('.ticket-content-textarea');
        event.currentTarget.classList.contains('locked') ? textarea.removeAttribute('disabled') : textarea.setAttribute('disabled', true);
        event.currentTarget.classList.toggle('locked');
    });
    ticket.querySelector('.ticket-content-textarea').addEventListener('blur', (event) => {
        tasks.find(task => task.id == id).description = event.currentTarget.value;
        console.log(tasks);
    });
}


