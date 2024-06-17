import { showError } from "./toast-notification";

export function showErrorResponse(error: unknown) {
    console.log(error);

    if (Array.isArray(error)) {
        for (const message of error as string[]) {
            showError(message);
        }
    } else {
        showError((error as Error).message);
    }
}

export function myDebounce<T>(func: () => Promise<T>, delay: number) {
    let time: any;

    return function () {
        clearTimeout(time);
        setTimeout(() => func(), delay);
    };
}

export function getChart(str: string) {

    if (typeof str !== 'undefined') {
        const index = 1

        if (index >= 0 && index < str.length) {
            return str.charAt(index).toLocaleLowerCase()
        } else {
            return ''
        }
    }
}

export function openModal(element: string) {
    return new Promise((resolve) => {
        var modal = document.getElementById(element) as HTMLElement;

        if (modal) {
            setTimeout(() => {
                modal.classList.add("fade", "show");
                modal.style.display = "block";
                modal.classList.add("in");
            }, 500);

            document.body.classList.add("modal-open");

            var modalBackdrop = document.createElement("div");
            modalBackdrop.className = "modal-backdrop fade show";
            document.body.appendChild(modalBackdrop);
        }
        resolve(modal);
    });
}

export function closeModal(element: string) {
    var modal = document.getElementById(element) as HTMLElement;
    var modalBackdrop = document.querySelector(".modal-backdrop");

    if (modal) {
        modal.classList.remove("in", "show", "fade");
        modal.style.display = "";

        document.body.classList.remove("modal-open");

        if (modalBackdrop) {
            document.body.removeChild(modalBackdrop);
        }
    }
}
