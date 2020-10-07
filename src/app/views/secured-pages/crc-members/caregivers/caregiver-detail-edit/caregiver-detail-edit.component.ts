import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../@tqp/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Caregiver } from '../Caregiver';
import { CaregiverService } from '../caregiver.service';

@Component({
    selector: 'app-caregiver-detail-edit',
    templateUrl: './caregiver-detail-edit.component.html',
    styleUrls: ['./caregiver-detail-edit.component.css']
})
export class CaregiverDetailEditComponent implements OnInit {
    @ViewChild('caregiverSurnameInputField', {static: false}) caregiverSurnameInputField: ElementRef;
    public pageSource: string;
    public newRecord: boolean;
    public caregiver: Caregiver;
    public caregiverEditForm: FormGroup;
    public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

    public validationMessages = {
        'caregiverId': [
            {type: 'required', message: 'An ID is required'}
        ],
        'caregiverSurname': [
            {type: 'required', message: 'A Surname is required'}
        ],
        'caregiverGivenName': [
            {type: 'required', message: 'A Given Name is required'}
        ],
        'caregiverAddress': [],
        'caregiverPhone': []
    };

    constructor(private route: ActivatedRoute,
                private caregiverService: CaregiverService,
                private router: Router,
                private formBuilder: FormBuilder,
                public _matDialog: MatDialog) {
        this.initializeForm();
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                const caregiverId = params['id'];
                // console.log('caregiverId', caregiverId);
                this.getCaregiverDetail(caregiverId);
            } else {
                // Create new Person
                this.newRecord = true;
                this.caregiver = new Caregiver();
                this.caregiver.caregiverId = null;
                setTimeout(() => {
                    this.caregiverSurnameInputField.nativeElement.focus();
                }, 0);
            }
        }).then();
    }

    private initializeForm(): void {
        this.caregiverEditForm = this.formBuilder.group({
            caregiverId: new FormControl(''),
            caregiverSurname: new FormControl('', Validators.required),
            caregiverGivenName: new FormControl('', Validators.required),
            caregiverAddress: new FormControl(''),
            caregiverPhone: new FormControl('')
        });
    }

    private getCaregiverDetail(caregiverId: number): void {
        this.caregiverService.getCaregiverDetail(caregiverId).subscribe(
            response => {
                this.caregiver = response;
                // console.log('response', response);
                this.caregiverEditForm.controls['caregiverId'].patchValue(this.caregiver.caregiverId);
                this.caregiverEditForm.controls['caregiverSurname'].patchValue(this.caregiver.caregiverSurname);
                this.caregiverEditForm.controls['caregiverGivenName'].patchValue(this.caregiver.caregiverGivenName);
                this.caregiverEditForm.controls['caregiverAddress'].patchValue(this.caregiver.caregiverAddress);
                this.caregiverEditForm.controls['caregiverPhone'].patchValue(this.caregiver.caregiverPhone);
            },
            error => {
                console.error('Error: ', error);
            }
        );
    }

    // BUTTONS

    public delete(caregiverId: number): void {
        this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.caregiverService.deleteCaregiver(caregiverId).subscribe(
                    response => {
                        // console.log('response: ', response);
                        this.router.navigate(['caregivers/caregiver-list']).then();
                    },
                    error => {
                        console.error('Error: ' + error.message);
                    }
                );
            }
            this.confirmDialogRef = null;
        });
    }

    public save(): void {
        const caregiver = new Caregiver();
        // console.log('crudEditForm', this.caregiverEditForm.value);
        caregiver.caregiverId = this.caregiverEditForm.value.caregiverId;
        caregiver.caregiverSurname = this.caregiverEditForm.value.caregiverSurname;
        caregiver.caregiverGivenName = this.caregiverEditForm.value.caregiverGivenName;
        caregiver.caregiverAddress = this.caregiverEditForm.value.caregiverAddress;
        caregiver.caregiverPhone = this.caregiverEditForm.value.caregiverPhone;

        if (this.newRecord) {
            this.caregiverService.createCaregiver(caregiver).subscribe(
                response => {
                    // console.log('response: ', response);
                    this.router.navigate(['caregivers/caregiver-detail', response.caregiverId]).then();
                },
                error => {
                    console.error('Error: ' + error.message);
                }
            );
        } else {
            this.caregiverService.updateCaregiver(caregiver).subscribe(
                response => {
                    // console.log('response: ', response);
                    this.router.navigate(['caregivers/caregiver-detail', response.caregiverId]).then();
                },
                error => {
                    console.error('Error: ' + error.message);
                }
            );
        }
    }

    public cancel(): void {
        if (this.caregiver.caregiverId) {
            this.router.navigate(['caregivers/caregiver-detail', this.caregiver.caregiverId]).then();
        } else {
            this.router.navigate(['caregivers/caregiver-list']).then();
        }
    }

    @HostListener('window:keydown', ['$event'])
    public handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.save();
        }
        if (event.key === 'Escape') {
            this.cancel();
        }
        if (event.ctrlKey && event.key === 'd') {
            event.preventDefault();
            this.delete(this.caregiver.caregiverId);
        }
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.save();
        }
        if (event.ctrlKey && event.key === 'c') {
            event.preventDefault();
            this.cancel();
        }
    }

}
